"""Build a P1-P12 visualization mosaic from the project's own scoring rules.

Usage:
    python scripts/build_question_visuals.py
    python scripts/build_question_visuals.py --output artifacts/p12_rule_mosaic.png --dpi 220
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
import textwrap
from typing import List, Sequence

import matplotlib.pyplot as plt
import numpy as np

plt.rcParams["font.family"] = "Times New Roman"
plt.rcParams["figure.facecolor"] = "white"
plt.rcParams["axes.facecolor"] = "white"
plt.rcParams["savefig.facecolor"] = "white"
plt.rcParams["savefig.edgecolor"] = "white"


def score_tier(value: float) -> int:
    v = float(np.clip(value, 0, 1))
    if v > 0.8:
        return 0
    if v > 0.6:
        return 1
    if v > 0.3:
        return 2
    if v > 0.1:
        return 3
    return 4


def tier_color(value: float) -> str:
    # 5-bin discrete palette: best -> worst (green -> red).
    palette = ["#1f9d55", "#65b84a", "#d4b140", "#e67e22", "#c0392b"]
    return palette[score_tier(value)]


@dataclass
class QuestionSpec:
    code: str
    title: str
    chart_type: str  # "bar", "curve"
    x_label: str
    y_label: str
    categories: Sequence[str] | None = None
    values: Sequence[float] | None = None
    x_range: Sequence[float] | None = None
    curve_id: str | None = None


def principle_questions() -> List[QuestionSpec]:
    # These values are aligned with src/renderer/app.js option scores.
    return [
        QuestionSpec(
            code="P1",
            title="Prevention",
            chart_type="curve",
            x_label="PMI (m_in / m_out)",
            y_label="Score",
            x_range=[1, 1000],
            curve_id="p1_pmi",
        ),
        QuestionSpec(
            code="P2",
            title="Atom Economy",
            chart_type="curve",
            x_label="AE = MW_product / sum(MW_reactants)",
            y_label="Score",
            x_range=[0, 1],
            curve_id="p2_ae",
        ),
        QuestionSpec("P3", "Less Hazardous Synthesis", "bar", "Option", "Score", ["Minimal", "Moderate", "High", "Red-Line"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P4", "Designing Safer Chemicals", "bar", "Option", "Score", ["Detox", "Function-Limited", "High Hazard", "Red-Line"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P5", "Safer Solvents and Auxiliaries", "bar", "Option", "Score", ["None", "Green", "Conventional", "Hazard-Reliant", "Banned ODS"], [1.0, 0.8, 0.6, 0.1, 0.0]),
        QuestionSpec("P6", "Design for Energy Efficiency", "bar", "Option", "Score", ["Near-Ambient", "Mild Thermal", "High Energy", "Extreme Energy"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P7", "Use of Renewable Feedstocks", "bar", "Option", "Score", ["Net-Carbon+", "Partial Offset", "Fossil Route", "High-Carbon"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P8", "Reduce Derivatives", "bar", "Option", "Score", ["Zero Protect", "Minimal", "Frequent", "Redundant"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P9", "Catalysis", "bar", "Option", "Score", ["Recoverable Cat.", "Conventional Cat.", "Stoichiometric", "Hazard Stoich."], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P10", "Design for Degradation", "bar", "Option", "Score", ["Readily Degradable", "Conventional Stable", "Persistent Traits", "PBT/F forever"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P11", "Real-time Analysis", "bar", "Option", "Score", ["In-line + Feedback", "Frequent Sampling", "Blind Fixed-Time", "Unmonitored Risk"], [1.0, 0.6, 0.3, 0.0]),
        QuestionSpec("P12", "Inherently Safer Chemistry", "bar", "Option", "Score", ["Eliminate/Substitute", "Eng Controls", "SOP-Dependent", "PPE/Uncontrolled"], [1.0, 0.6, 0.3, 0.0]),
    ]


def draw_bar(ax, spec: QuestionSpec) -> None:
    cats = list(spec.categories or [])
    vals = np.array(spec.values or [], dtype=float)
    if not cats or vals.size == 0:
        ax.text(0.5, 0.5, "No data", ha="center", va="center")
        return

    colors = [tier_color(v) for v in vals]
    x = np.arange(len(cats))
    bars = ax.bar(x, vals, width=0.28, color=colors, edgecolor="white", linewidth=0.8)

    wrapped_labels = [compact_tick_label(label, max_width=14) for label in cats]
    ax.set_xticks(x)
    ax.set_xticklabels(wrapped_labels, fontsize=6.6, rotation=16, ha="right")
    ax.margins(x=0.06)
    for bar, val in zip(bars, vals):
        ax.text(bar.get_x() + bar.get_width() / 2, val + 0.02, f"{val:.2f}", ha="center", va="bottom", fontsize=7)


def compact_tick_label(label: str, max_width: int = 14) -> str:
    raw = str(label or "").strip()
    if len(raw) <= max_width:
        return raw
    return "\n".join(
        textwrap.wrap(raw, width=max_width, break_long_words=False, break_on_hyphens=True)
    )


def draw_curve(ax, spec: QuestionSpec) -> None:
    x0, x1 = (spec.x_range or [0, 1])

    if spec.curve_id == "p1_pmi":
        x = np.linspace(max(1.0, x0), max(1.1, x1), 3000)
        # Strictly follow: Score = max(0, 1 - log10(PMI)/3)
        y = np.maximum(0.0, 1.0 - (np.log10(x) / 3.0))
        ax.set_xlim(1, 1000)
        ax.set_xticks([1, 200, 400, 600, 800, 1000])
    elif spec.curve_id == "p2_ae":
        x = np.linspace(max(0.0, x0), min(1.0, x1), 1500)
        # Score = clamp(MW_product / sum(MW_reactants), 0, 1)
        y = np.clip(x, 0, 1)
    else:
        x = np.linspace(x0, x1, 1200)
        y = 1 - np.power((x - x0) / max(1e-9, (x1 - x0)), 0.6)
        y = np.clip(y, 0, 1)

    # Render each tiny line segment with its own tier color so threshold boundaries are strict.
    for i in range(len(x) - 1):
        y_mid = (y[i] + y[i + 1]) * 0.5
        color = tier_color(float(y_mid))
        ax.plot(x[i:i + 2], y[i:i + 2], color=color, linewidth=1.8)


def draw_question(ax, spec: QuestionSpec) -> None:
    ax.set_facecolor("white")
    ax.set_title(f"{spec.code} | {spec.title}", fontsize=9, pad=3)
    if spec.chart_type == "curve":
        ax.set_xlabel(spec.x_label, fontsize=7, labelpad=1)
    else:
        ax.set_xlabel("")
    ax.set_ylabel(spec.y_label, fontsize=7, labelpad=1)

    if spec.chart_type == "bar":
        draw_bar(ax, spec)
    elif spec.chart_type == "curve":
        draw_curve(ax, spec)
    else:
        ax.text(0.5, 0.5, f"Unsupported: {spec.chart_type}", ha="center", va="center")

    ax.set_ylim(0, 1.05)
    ax.grid(axis="y", color="#B8B8B8", alpha=0.22, linewidth=0.35)
    ax.tick_params(axis="y", labelsize=7)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)


def build_mosaic(questions: Sequence[QuestionSpec], output: str, cols: int, dpi: int) -> None:
    n = len(questions)
    rows = int(np.ceil(n / cols))

    fig = plt.figure(figsize=(4.2 * cols, 2.55 * rows), constrained_layout=False)

    for i, q in enumerate(questions):
        idx = i + 1
        ax = fig.add_subplot(rows, cols, idx)
        draw_question(ax, q)

    # Hide any unused panels.
    for j in range(n + 1, rows * cols + 1):
        empty_ax = fig.add_subplot(rows, cols, j)
        empty_ax.axis("off")

    fig.subplots_adjust(left=0.04, right=0.995, bottom=0.06, top=0.90, wspace=0.15, hspace=0.32)
    fig.suptitle("P1-P12 Rule Visualization Mosaic", fontsize=13, y=0.985)
    fig.savefig(output, dpi=dpi)
    plt.close(fig)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a P1-P12 mosaic image from project scoring rules.")
    parser.add_argument("--output", default="artifacts/p12_rule_mosaic.png", help="Output image path")
    parser.add_argument("--cols", type=int, default=4, help="Number of subplot columns")
    parser.add_argument("--dpi", type=int, default=200, help="Output DPI")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    questions = principle_questions()

    output_dir = args.output.rsplit("/", 1)[0] if "/" in args.output else ""
    if output_dir:
        import os

        os.makedirs(output_dir, exist_ok=True)

    build_mosaic(questions, args.output, args.cols, args.dpi)
    print(f"Done. Output: {args.output}")


if __name__ == "__main__":
    main()
