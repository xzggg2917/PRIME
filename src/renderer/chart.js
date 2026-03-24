(function exposeRadarChart() {
  const hoverRegistry = new WeakMap();

  function clamp01(value) {
    if (Number.isNaN(value)) {
      return 0;
    }
    if (value < 0) {
      return 0;
    }
    if (value > 1) {
      return 1;
    }
    return value;
  }

  function getScoreTier(score) {
    const v = clamp01(score);
    if (v > 0.8) {
      return 0;
    }
    if (v > 0.6) {
      return 1;
    }
    if (v > 0.3) {
      return 2;
    }
    if (v > 0.1) {
      return 3;
    }
    return 4;
  }

  function hexToRgb(hex) {
    if (typeof hex !== 'string') {
      return { r: 0, g: 0, b: 0 };
    }
    const normalized = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
    const value = normalized.replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16) || 0,
      g: parseInt(value.slice(2, 4), 16) || 0,
      b: parseInt(value.slice(4, 6), 16) || 0
    };
  }

  function rgbToHex(r, g, b) {
    const toHex = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function mixHex(fromHex, toHex, t) {
    const p = Math.max(0, Math.min(1, Number(t) || 0));
    const a = hexToRgb(fromHex);
    const b = hexToRgb(toHex);
    return rgbToHex(
      a.r + (b.r - a.r) * p,
      a.g + (b.g - a.g) * p,
      a.b + (b.b - a.b) * p
    );
  }

  function rgbaFromHex(hex, alpha) {
    const c = hexToRgb(hex);
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
  }

  function getTierProgress(score) {
    const v = clamp01(score);
    if (v > 0.8) {
      return (v - 0.8) / 0.2;
    }
    if (v > 0.6) {
      return (v - 0.6) / 0.2;
    }
    if (v > 0.3) {
      return (v - 0.3) / 0.3;
    }
    if (v > 0.1) {
      return (v - 0.1) / 0.2;
    }
    return v / 0.1;
  }

  function getScoreVisual(score) {
    const palette = [
      {
        label: 'Excellent',
        low: '#2cbf68',
        high: '#167a41'
      },
      {
        label: 'Great',
        low: '#7fc85b',
        high: '#4f9f34'
      },
      {
        label: 'Good',
        low: '#e0c25a',
        high: '#b38f2f'
      },
      {
        label: 'Poor',
        low: '#ee9648',
        high: '#c46615'
      },
      {
        label: 'Bad',
        low: '#d45145',
        high: '#99251d'
      }
    ];
    const tier = palette[getScoreTier(score)];
    const t = getTierProgress(score);
    const solid = mixHex(tier.low, tier.high, t);
    const strong = mixHex(solid, '#111111', 0.22);
    const edgeBase = mixHex(solid, '#ffffff', 0.75);
    return {
      label: tier.label,
      solid,
      soft: rgbaFromHex(solid, 0.22),
      strong,
      glow: rgbaFromHex(solid, 0.46),
      edge: rgbaFromHex(edgeBase, 0.78)
    };
  }

  function ensureTooltipEl() {
    let tooltip = document.getElementById('chartHoverTooltip');
    if (tooltip) {
      return tooltip;
    }

    tooltip = document.createElement('div');
    tooltip.id = 'chartHoverTooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999';
    tooltip.style.padding = '7px 9px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.border = '1px solid rgba(21, 64, 58, 0.35)';
    tooltip.style.background = 'rgba(250, 255, 253, 0.96)';
    tooltip.style.color = '#193b37';
    tooltip.style.font = '600 12px "Segoe UI", sans-serif';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.boxShadow = '0 8px 18px rgba(0, 0, 0, 0.18)';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    return tooltip;
  }

  function hideTooltip() {
    const tooltip = ensureTooltipEl();
    tooltip.style.display = 'none';
  }

  function isAngleWithin(angle, start, end) {
    let a = angle;
    let s = start;
    let e = end;
    while (a < 0) a += Math.PI * 2;
    while (s < 0) s += Math.PI * 2;
    while (e < 0) e += Math.PI * 2;
    while (a >= Math.PI * 2) a -= Math.PI * 2;
    while (s >= Math.PI * 2) s -= Math.PI * 2;
    while (e >= Math.PI * 2) e -= Math.PI * 2;

    if (s <= e) {
      return a >= s && a <= e;
    }
    return a >= s || a <= e;
  }

  function resolveHoverRegion(regions, x, y) {
    for (let i = regions.length - 1; i >= 0; i -= 1) {
      const region = regions[i];
      if (region.type === 'circle') {
        const dx = x - region.cx;
        const dy = y - region.cy;
        if ((dx * dx + dy * dy) <= region.r * region.r) {
          return region;
        }
      } else if (region.type === 'donut') {
        const dx = x - region.cx;
        const dy = y - region.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= region.rInner && dist <= region.rOuter) {
          const a = Math.atan2(dy, dx);
          if (isAngleWithin(a, region.start, region.end)) {
            return region;
          }
        }
      }
    }
    return null;
  }

  function setCanvasHoverRegions(canvas, regions) {
    if (!canvas) {
      return;
    }

    let state = hoverRegistry.get(canvas);
    if (!state) {
      state = {
        regions: []
      };

      const handleMove = (event) => {
        const tooltip = ensureTooltipEl();
        const rect = canvas.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          hideTooltip();
          return;
        }

        const sx = canvas.width / rect.width;
        const sy = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * sx;
        const y = (event.clientY - rect.top) * sy;
        const hit = resolveHoverRegion(state.regions, x, y);

        if (!hit || !hit.tooltip) {
          canvas.style.cursor = 'default';
          hideTooltip();
          return;
        }

        canvas.style.cursor = 'pointer';
        tooltip.textContent = hit.tooltip;
        tooltip.style.display = 'block';

        // Viewport-aware placement: flip horizontally/vertically near edges.
        const margin = 12;
        const offset = 12;
        const tipRect = tooltip.getBoundingClientRect();
        let left = event.clientX + offset;
        let top = event.clientY + offset;

        if (left + tipRect.width + margin > window.innerWidth) {
          left = event.clientX - tipRect.width - offset;
        }
        if (left < margin) {
          left = margin;
        }

        if (top + tipRect.height + margin > window.innerHeight) {
          top = event.clientY - tipRect.height - offset;
        }
        if (top < margin) {
          top = margin;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      };

      const handleLeave = () => {
        canvas.style.cursor = 'default';
        hideTooltip();
      };

      canvas.addEventListener('mousemove', handleMove);
      canvas.addEventListener('mouseleave', handleLeave);
      hoverRegistry.set(canvas, state);
    }

    state.regions = regions;
  }

  function drawRadarChart(canvas, labels, values, normalizedScore) {
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.36;
    const safeValues = Array.isArray(values) ? values : [];
    const meanScore = safeValues.length > 0
      ? safeValues.reduce((sum, v) => sum + clamp01(v), 0) / safeValues.length
      : 0;
    const radarScore = Number.isFinite(Number(normalizedScore)) ? clamp01(Number(normalizedScore)) : meanScore;
    const radarVisual = getScoreVisual(radarScore);

    ctx.clearRect(0, 0, width, height);
    const hoverRegions = [];

    const levels = 5;
    for (let level = 1; level <= levels; level += 1) {
      const radius = (maxRadius * level) / levels;
      ctx.beginPath();
      labels.forEach((_, i) => {
        const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(70, 56, 46, 0.20)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    labels.forEach((label, i) => {
      const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(70, 56, 46, 0.24)';
      ctx.stroke();

      const labelX = centerX + (maxRadius + 26) * Math.cos(angle);
      const labelY = centerY + (maxRadius + 26) * Math.sin(angle);
      ctx.fillStyle = '#2f2a25';
      ctx.font = '12px "Segoe UI", sans-serif';
      ctx.textAlign = labelX >= centerX ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelX, labelY);
    });

    ctx.beginPath();
    safeValues.forEach((value, i) => {
      const radius = maxRadius * value;
      const angle = (Math.PI * 2 * i) / safeValues.length - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = radarVisual.soft;
    ctx.strokeStyle = radarVisual.strong;
    ctx.lineWidth = 2.2;
    ctx.fill();
    ctx.stroke();

    safeValues.forEach((value, i) => {
      const radius = maxRadius * value;
      const angle = (Math.PI * 2 * i) / safeValues.length - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = radarVisual.strong;
      ctx.fill();

      hoverRegions.push({
        type: 'circle',
        cx: x,
        cy: y,
        r: 10,
        tooltip: `${labels[i]}: ${(clamp01(value) * 100).toFixed(1)}%`
      });
    });

    setCanvasHoverRegions(canvas, hoverRegions);
  }

  function drawGaugeChart(canvas, normalizedScore, totalScore, principleValues, principleWeights) {
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height * 0.56;
    const score = clamp01(normalizedScore);
    const values = Array.isArray(principleValues) ? principleValues : [];
    const fruitPositions = [
      { x: centerX - 170, y: 102, rot: -0.08 },
      { x: centerX - 82, y: 68, rot: 0.02 },
      { x: centerX + 2, y: 56, rot: 0.09 },
      { x: centerX + 95, y: 78, rot: -0.12 },
      { x: centerX + 170, y: 118, rot: 0.05 },
      { x: centerX - 136, y: 155, rot: 0.14 },
      { x: centerX - 44, y: 144, rot: -0.16 },
      { x: centerX + 44, y: 154, rot: 0.15 },
      { x: centerX + 134, y: 164, rot: -0.08 },
      { x: centerX - 92, y: 216, rot: -0.06 },
      { x: centerX + 0, y: 208, rot: 0.07 },
      { x: centerX + 92, y: 218, rot: -0.11 }
    ];
    const weightRaw = Array.isArray(principleWeights) ? principleWeights : [];
    const safeWeights = Array.from({ length: fruitPositions.length }, (_, i) => {
      const w = Number(weightRaw[i]);
      return Number.isFinite(w) && w > 0 ? w : 1;
    });
    const avgWeight = safeWeights.reduce((sum, w) => sum + w, 0) / safeWeights.length;
    const weightTotal = safeWeights.reduce((sum, w) => sum + w, 0) || fruitPositions.length;
    const hoverRegions = [];

    function drawFruitBadge(x, y, size, value, index, rotation) {
      const colorSet = getScoreVisual(value);
      const petalColor = colorSet.solid;
      const petalEdge = colorSet.edge;
      const coreColor = colorSet.strong;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.shadowColor = colorSet.glow;
      ctx.shadowBlur = 14;

      // Petal ring.
      for (let i = 0; i < 6; i += 1) {
        const a = -Math.PI / 2 + (Math.PI * 2 * i) / 6;
        const px = Math.cos(a) * size * 0.56;
        const py = Math.sin(a) * size * 0.56;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.48, size * 0.34, 0, 0, Math.PI * 2);
        ctx.fillStyle = petalColor;
        ctx.fill();
        ctx.strokeStyle = petalEdge;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();
      }

      // Soft inner blossom.
      const blossomGrad = ctx.createRadialGradient(-size * 0.18, -size * 0.26, size * 0.12, 0, 0, size * 0.9);
      blossomGrad.addColorStop(0, 'rgba(245, 255, 241, 0.38)');
      blossomGrad.addColorStop(1, 'rgba(245, 255, 241, 0)');
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.88, 0, Math.PI * 2);
      ctx.fillStyle = blossomGrad;
      ctx.fill();

      ctx.shadowBlur = 0;

      // Core circle.
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.46, 0, Math.PI * 2);
      ctx.fillStyle = coreColor;
      ctx.fill();
      ctx.strokeStyle = petalEdge;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.fillStyle = 'rgba(242, 251, 241, 0.96)';
      const indexFontPx = Math.max(12, Math.round(size * 0.45));
      ctx.font = `700 ${indexFontPx}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(index + 1), 0, -2);
      ctx.restore();
    }

    ctx.clearRect(0, 0, width, height);

    // Light background.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Trunk silhouette.
    ctx.beginPath();
    ctx.moveTo(centerX - 55, height - 26);
    ctx.bezierCurveTo(centerX - 72, height - 66, centerX - 60, centerY + 72, centerX - 30, centerY + 46);
    ctx.bezierCurveTo(centerX - 20, centerY + 34, centerX - 16, centerY + 16, centerX - 10, centerY - 2);
    ctx.lineTo(centerX + 10, centerY - 2);
    ctx.bezierCurveTo(centerX + 16, centerY + 16, centerX + 20, centerY + 34, centerX + 30, centerY + 46);
    ctx.bezierCurveTo(centerX + 60, centerY + 72, centerX + 72, height - 66, centerX + 55, height - 26);
    ctx.closePath();
    const trunkGrad = ctx.createLinearGradient(centerX, centerY - 2, centerX, height - 26);
    trunkGrad.addColorStop(0, '#63d96d');
    trunkGrad.addColorStop(1, '#2c9448');
    ctx.fillStyle = trunkGrad;
    ctx.shadowColor = 'rgba(128, 244, 146, 0.52)';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Branches connecting to 12 blocks.
    const branchRoot = { x: centerX, y: centerY + 8 };
    fruitPositions.forEach((pos, i) => {
      const t = i / Math.max(1, fruitPositions.length - 1);
      const branchMidX = centerX + (pos.x - centerX) * 0.46 + (pos.x < centerX ? -16 : 16);
      const branchMidY = centerY - 4 - 74 * (1 - Math.abs(t - 0.5) * 1.2);

      ctx.beginPath();
      ctx.moveTo(branchRoot.x, branchRoot.y);
      ctx.quadraticCurveTo(branchMidX, branchMidY, pos.x, pos.y + 16);
      ctx.strokeStyle = 'rgba(128, 255, 159, 0.68)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = 'rgba(110, 255, 142, 0.52)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glow node on branch.
      const nodeX = branchRoot.x + (pos.x - branchRoot.x) * 0.58;
      const nodeY = branchRoot.y + (pos.y + 16 - branchRoot.y) * 0.58;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(193, 255, 189, 0.94)';
      ctx.fill();
    });

    // Draw 12 blocks on the tree.
    fruitPositions.forEach((pos, i) => {
      // Gentle scaling around the average weight avoids over-amplifying tiny differences (e.g., 8.34 vs 8.33).
      const relativeWeight = avgWeight > 0 ? safeWeights[i] / avgWeight : 1;
      const sizeScale = Math.max(0.88, Math.min(1.16, Math.sqrt(relativeWeight)));
      const flowerSize = 34 * sizeScale;

      drawFruitBadge(pos.x, pos.y, flowerSize, values[i] ?? 0, i, pos.rot);
      const weightPercent = (safeWeights[i] / weightTotal) * 100;
      hoverRegions.push({
        type: 'circle',
        cx: pos.x,
        cy: pos.y,
        r: Math.max(20, flowerSize * 0.75),
        tooltip: `P${i + 1}: score ${(clamp01(values[i] ?? 0) * 100).toFixed(1)}%, weight ${weightPercent.toFixed(1)}%`
      });
    });

    // Qualitative assessment text above numeric score.
    const overallVisual = getScoreVisual(score);
    const assessmentText = overallVisual.label;

    ctx.fillStyle = 'rgba(236, 247, 240, 0.95)';
    ctx.font = '700 20px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(assessmentText, centerX, centerY + 96);

    // Score text on trunk.
    ctx.fillStyle = overallVisual.solid;
    ctx.shadowColor = overallVisual.glow;
    ctx.shadowBlur = 10;
    ctx.font = '700 44px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(score.toFixed(2), centerX, centerY + 138);
    ctx.shadowBlur = 0;

    hoverRegions.push({
      type: 'circle',
      cx: centerX,
      cy: centerY + 130,
      r: 56,
      tooltip: `Overall: ${(score * 100).toFixed(1)}% (${totalScore.toFixed(2)} / 1.00)`
    });

    setCanvasHoverRegions(canvas, hoverRegions);
  }

  function drawWeightedFlowerChart(canvas, principleValues, principleWeights, normalizedScore, totalScore) {
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height * 0.52;
    const count = 12;
    const values = Array.isArray(principleValues) ? principleValues : [];
    const weightsRaw = Array.isArray(principleWeights) ? principleWeights : [];
    const score = clamp01(normalizedScore);
    const hoverRegions = [];

    const rawWeights = Array.from({ length: count }, (_, i) => {
      const w = Number(weightsRaw[i]);
      if (Number.isNaN(w) || w <= 0) {
        return 1;
      }
      return w;
    });

    const maxWeight = Math.max(...rawWeights);
    const weightNorm = rawWeights.map((w) => w / maxWeight);

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const totalWeight = rawWeights.reduce((sum, w) => sum + w, 0) || count;
    const innerR = Math.min(width, height) * 0.17;
    const outerR = Math.min(width, height) * 0.39;
    const meanR = (innerR + outerR) * 0.5;
    const gap = 0.03;
    const availableSpan = Math.PI * 2 - gap * count;
    let cursor = -Math.PI / 2;

    function drawDonutSlice(cx, cy, rOuter, rInner, startA, endA) {
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, startA, endA);
      ctx.arc(cx, cy, rInner, endA, startA, true);
      ctx.closePath();
    }

    for (let idx = 0; idx < count; idx += 1) {
      const v = clamp01(values[idx] ?? 0);
      const w = rawWeights[idx];
      const span = availableSpan * (w / totalWeight);
      const a0 = cursor;
      const a1 = cursor + span;
      const mid = (a0 + a1) * 0.5;
      const colorSet = getScoreVisual(v);

      // Drop shadow for subtle 3D depth.
      drawDonutSlice(centerX, centerY + 3, outerR, innerR, a0, a1);
      ctx.fillStyle = 'rgba(76, 90, 103, 0.16)';
      ctx.fill();

      // Main segment.
      const gx0 = centerX + innerR * Math.cos(mid);
      const gy0 = centerY + innerR * Math.sin(mid);
      const gx1 = centerX + outerR * Math.cos(mid);
      const gy1 = centerY + outerR * Math.sin(mid);
      const segGrad = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
      segGrad.addColorStop(0, colorSet.soft);
      segGrad.addColorStop(1, colorSet.solid);

      drawDonutSlice(centerX, centerY, outerR, innerR, a0, a1);
      ctx.fillStyle = segGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(235, 244, 236, 0.86)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Highlight strip.
      ctx.beginPath();
      ctx.arc(centerX, centerY - 1.2, outerR - (outerR - innerR) * 0.18, a0 + 0.01, a1 - 0.01);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.48)';
      ctx.lineWidth = (outerR - innerR) * 0.12;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Segment label (hide when area is too small to avoid overlap).
      const labelR = meanR;
      const lx = centerX + labelR * Math.cos(mid);
      const ly = centerY + labelR * Math.sin(mid);
      const percent = ((w / totalWeight) * 100).toFixed(1);
      if (span >= 0.20) {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(mid + Math.PI / 2);
        ctx.fillStyle = 'rgba(16, 26, 32, 0.88)';
        ctx.font = '700 14px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`P${idx + 1}`, 0, 0);
        ctx.restore();
      }

      hoverRegions.push({
        type: 'donut',
        cx: centerX,
        cy: centerY,
        rInner: innerR,
        rOuter: outerR,
        start: a0,
        end: a1,
        tooltip: `P${idx + 1}: score ${(v * 100).toFixed(1)}%, weight ${percent}%`
      });

      cursor = a1 + gap;
    }

    // Center core.
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerR - 8, 0, Math.PI * 2);
    ctx.fillStyle = '#f7fbf8';
    ctx.fill();
    ctx.strokeStyle = 'rgba(110, 149, 122, 0.50)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const scoreVisual = getScoreVisual(score);
    ctx.fillStyle = scoreVisual.strong;
    ctx.font = '700 28px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(score.toFixed(2), centerX, centerY - 6);

    ctx.fillStyle = 'rgba(84, 98, 109, 0.86)';
    ctx.font = '700 13px "Segoe UI", sans-serif';
    ctx.fillText(`${totalScore.toFixed(2)} / 1.00`, centerX, centerY + 18);

    hoverRegions.push({
      type: 'circle',
      cx: centerX,
      cy: centerY,
      r: innerR - 8,
      tooltip: `Overall: ${(score * 100).toFixed(1)}% (${totalScore.toFixed(2)} / 1.00)`
    });

    setCanvasHoverRegions(canvas, hoverRegions);
  }

  window.radarChart = {
    draw: drawRadarChart
  };

  window.gaugeChart = {
    draw: drawGaugeChart
  };

  window.flowerChart = {
    draw: drawWeightedFlowerChart
  };
})();