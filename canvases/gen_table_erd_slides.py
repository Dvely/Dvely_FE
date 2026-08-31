#!/usr/bin/env python3
"""Combined ERD (left) + table spec (right) slides, matching the sample layout."""
from __future__ import annotations

import html
import importlib.util
import re
from pathlib import Path

ROOT = Path("/Users/kimtaewoo/Documents/GitHub/Dvely_FE/canvases")
spec = importlib.util.spec_from_file_location("gen_table_defs", ROOT / "gen_table_defs.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
TABLES = mod.TABLES

OUT = ROOT / "qeploy-table-defs"
W, H = 1600, 900
LEFT_W = 800

FK_RE = re.compile(r"→\s*(\w+)\(")


def is_pk(col) -> bool:
    return "기본키" in (col[5] or "")


def fk_targets(col) -> list[str]:
    return FK_RE.findall(col[5] or "")


def graph():
    parents: dict[str, list[tuple[str, str, str]]] = {n: [] for n in TABLES}
    children: dict[str, list[tuple[str, str]]] = {n: [] for n in TABLES}
    one_one: set[tuple[str, str]] = set()
    for name, cols in TABLES.items():
        pk_names = {c[0] for c in cols if is_pk(c)}
        for col in cols:
            for tgt in fk_targets(col):
                if tgt not in TABLES:
                    continue
                req = col[2]
                parents[name].append((tgt, col[0], req))
                children[tgt].append((name, col[0]))
                if col[0] in pk_names:
                    one_one.add((tgt, name))
    return parents, children, one_one


PARENTS, CHILDREN, ONE_ONE = graph()


def unique_tables(pairs, limit):
    out, seen = [], set()
    for item in pairs:
        t = item[0]
        if t in seen:
            continue
        seen.add(t)
        out.append(item)
        if len(out) >= limit:
            break
    return out


def erd_fields(name: str, n: int) -> list:
    cols = TABLES[name]
    pk = [c for c in cols if is_pk(c)]
    fks = [c for c in cols if fk_targets(c) and c not in pk]
    skip = {"created_at", "updated_at"}
    rest = [c for c in cols if c not in pk and c not in fks and c[0] not in skip]
    tail = [c for c in cols if c[0] in skip]
    shown = pk + fks + rest + tail
    return shown[: min(n, len(shown))]


def box_html(name, x, y, bw, fields, focus: bool) -> str:
    rows = []
    for col in fields:
        pk = is_pk(col)
        fk = bool(fk_targets(col)) and not pk
        cls = "erow"
        if pk:
            cls += " pk"
        elif fk:
            cls += " fk"
        rows.append(
            f'<div class="{cls}">'
            f'<span class="dot">&#9679;</span>'
            f'<span class="fn">{html.escape(col[0])}</span>'
            f'<span class="ty">{html.escape(col[1])}</span></div>'
        )
    cls = "ebox focus" if focus else "ebox"
    return (
        f'<div class="{cls}" style="left:{x}px;top:{y}px;width:{bw}px">'
        f'<div class="ehd"><span class="ticon"></span>{html.escape(name)}</div>'
        + "".join(rows)
        + '<div class="eft">Indexes <i>&#9660;</i></div>'
        + "</div>"
    )


def box_h(nfields: int) -> int:
    return 18 + 14 * max(nfields, 1) + 12


def pack_column(items, x, bw, start_y, bottom, min_fields, prefer_all=False):
    """Stack boxes in a column and fill down to bottom by showing more fields, then gaps."""
    if not items:
        return []
    n = len(items)
    gap_min = 8
    avail = max(40, bottom - start_y)
    budget = (avail - gap_min * max(n - 1, 0)) / n
    placed = []
    for item in items:
        t = item[0]
        max_f = len(TABLES[t])
        nfields = min(max_f, max(min_fields, int((budget - 30) / 14)))
        fields = erd_fields(t, nfields)
        h = box_h(len(fields))
        while h > budget + 2 and nfields > 2:
            nfields -= 1
            fields = erd_fields(t, nfields)
            h = box_h(len(fields))
        placed.append([t, x, 0, bw, fields, h])
    used = sum(p[5] for p in placed)
    leftover = avail - used
    extra_gap = leftover / (n - 1) if n > 1 and leftover > 0 else 0
    y = start_y
    for p in placed:
        p[2] = int(round(y))
        y += p[5] + gap_min + extra_gap
    return [tuple(p) for p in placed]


def layout_erd(focus: str, target_bottom: int):
    """Place focus in center, parents left, children right. Fill to target_bottom."""
    parents = unique_tables(PARENTS[focus], 4)
    children = [c for c in unique_tables(CHILDREN[focus], 8) if c[0] != focus]

    pad = 12
    bw = 210
    gap_x = 54
    start_y = 36
    if parents and children:
        col0_x, col1_x, col2_x = pad, pad + bw + gap_x, pad + (bw + gap_x) * 2
    elif parents:
        col0_x, col1_x, col2_x = pad, pad + bw + gap_x, pad + (bw + gap_x) * 2
    else:
        col0_x, col1_x, col2_x = pad, pad, pad + bw + gap_x

    left = pack_column(parents, col0_x, bw, start_y, target_bottom, 4)
    center = pack_column([(focus,)], col1_x, bw, start_y, target_bottom, 6, prefer_all=False)
    right = pack_column(children, col2_x, bw, start_y, target_bottom, 4)

    boxes = {t: (x, y, w, f, h) for t, x, y, w, f, h in left + center + right}

    paths = []
    labels = []

    def row_y(t, field=None, frac=None):
        x, y, w, fields, h = boxes[t]
        if field:
            for i, col in enumerate(fields):
                if col[0] == field:
                    return y + 18 + 14 * i + 7
        top, bot = y + 22, y + max(h - 14, 22)
        if frac is None:
            return (top + bot) / 2
        return top + (bot - top) * frac

    def edge(t, side, field=None, frac=None):
        x, y, w, fields, h = boxes[t]
        yy = row_y(t, field, frac)
        if side == "R":
            return x + w, yy
        return x, yy

    p_ok = [(tgt, col, req) for tgt, col, req in parents if tgt in boxes]
    n_p = len(p_ok)
    for i, (tgt, col, req) in enumerate(p_ok):
        x1, y1 = edge(tgt, "R")
        frac = i / max(n_p - 1, 1) if n_p > 1 else 0.5
        x2, y2 = edge(focus, "L", field=col if n_p <= 2 else None, frac=frac)
        mid = x1 + 12 + i * 8
        mid = min(mid, (x1 + x2) / 2)
        paths.append(f"M{x1:.0f} {y1:.0f} H{mid:.0f} V{y2:.0f} H{x2:.0f}")
        card = "1" if (tgt, focus) in ONE_ONE else "N"
        labels.append((x1 + 6, y1 - 3, "1"))
        labels.append(((mid + x2) / 2 - 4, y2 - 3, card))

    c_ok = [(ch, col) for ch, col in children if ch in boxes and ch != focus]
    n_c = len(c_ok)
    for i, (ch, col) in enumerate(c_ok):
        frac = i / max(n_c - 1, 1) if n_c > 1 else 0.5
        x1, y1 = edge(focus, "R", frac=frac)
        x2, y2 = edge(ch, "L", field=col)
        mid = (x1 + x2) / 2 + (i - (n_c - 1) / 2) * 7
        paths.append(f"M{x1:.0f} {y1:.0f} H{mid:.0f} V{y2:.0f} H{x2:.0f}")
        card = "1" if (focus, ch) in ONE_ONE else "N"
        labels.append((x1 + 6, y1 - 3, "1"))
        labels.append(((mid + x2) / 2 - 4, y2 - 3, card))

    return boxes, paths, labels, focus


def estimate_erd_h(focus: str) -> int:
    parents = unique_tables(PARENTS[focus], 4)
    children = [c for c in unique_tables(CHILDREN[focus], 8) if c[0] != focus]

    def col_h(items, nf):
        if not items:
            return 0
        return 36 + sum(box_h(min(nf, len(TABLES[i[0]]))) + 8 for i in items) - 8

    return max(
        col_h(parents, 4),
        col_h([(focus,)], min(8, len(TABLES[focus]))),
        col_h(children, 4),
        200,
    )


def spec_rows(cols: list) -> str:
    rows = []
    for col, typ, req, values, desc, extra in cols:
        req_txt = "필수" if req == "Y" else "선택"
        parts = []
        if extra:
            parts.append(html.escape(extra))
        if desc:
            parts.append(html.escape(desc))
        desc_html = " ".join(parts)
        rows.append(
            "<tr>"
            f"<td class='nm'>{html.escape(col)}</td>"
            f"<td class='c'>{html.escape(typ)}</td>"
            f"<td class='c'>{req_txt}</td>"
            f"<td class='c'>{html.escape(values)}</td>"
            f"<td class='c'>활성</td>"
            f"<td class='desc'>{desc_html}</td></tr>"
        )
    return "".join(rows)


def render(name: str) -> tuple[str, int]:
    cols = TABLES[name]
    n = len(cols)
    pad_y, pad_x = 12, 14
    title_h, th_h, min_row = 28, 24, 20
    spec_h = title_h + th_h + n * min_row
    inner = max(spec_h, estimate_erd_h(name))
    inner = min(inner, 860)
    row_h = max(min_row, (inner - title_h) // (n + 1))
    font = 12 if row_h >= 24 else (11 if row_h >= 18 else 10)
    left_h = inner
    page_h = pad_y * 2 + inner

    boxes, paths, labels, focus = layout_erd(name, inner - 6)
    box_htmls = []
    for t, (x, y, w, fields, h) in boxes.items():
        box_htmls.append(box_html(t, x, y, w, fields, t == focus))

    path_d = [
        f'<path d="{d}" fill="none" stroke="#6a7d8c" stroke-width="1.15"/>' for d in paths
    ]
    lab = []
    for x, y, txt in labels:
        lab.append(
            f'<text x="{x:.0f}" y="{y:.0f}" font-size="11" font-weight="700" fill="#3a4a56">{txt}</text>'
        )

    html_out = f"""<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"/><title>{html.escape(name)}</title>
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body, .page {{ width:{W}px; height:{page_h}px; background:#fff; overflow:hidden; }}
body {{ font-family: "Malgun Gothic","Apple SD Gothic Neo","Noto Sans KR",sans-serif; color:#111; }}
.page {{ display:flex; padding:{pad_y}px {pad_x}px; gap:12px; height:{page_h}px; }}
.left {{
  width:{LEFT_W}px; height:{left_h}px; flex-shrink:0;
  background:#eef2f5; position:relative; overflow:hidden;
}}
.erd-ttl {{
  position:absolute; left:12px; top:8px;
  font-size:14px; font-weight:800; color:#333;
}}
.ebox {{
  position:absolute; background:#fff;
  border:1.15px solid #7a9bb4;
}}
.ebox.focus {{ box-shadow: 0 0 0 1.5px #5a8fb3; }}
.ehd {{
  background:#8eb9d6; color:#fff;
  font-size:11px; font-weight:800; height:18px;
  display:flex; align-items:center; padding:0 6px; white-space:nowrap;
}}
.ticon {{
  width:10px; height:9px; margin-right:5px; flex-shrink:0;
  border:1.15px solid #fff; border-radius:1px;
  background:
    linear-gradient(#fff,#fff) 0 2.5px / 100% 1px no-repeat,
    linear-gradient(#fff,#fff) 0 5px / 100% 1px no-repeat;
}}
.erow {{
  display:flex; align-items:center;
  height:14px; padding:0 5px 0 4px; font-size:10px;
  border-bottom:1px solid #ececec;
}}
.erow:nth-child(odd) {{ background:#f7f7f7; }}
.erow.pk {{ background:#f0f0f0; }}
.dot {{
  width:10px; flex-shrink:0; text-align:center; margin-right:3px;
  line-height:1; color:#4eb6c9; font-size:7px;
}}
.pk .dot {{ color:#d4a017; font-size:8px; }}
.fk .dot {{ color:#d45454; font-size:8px; }}
.fn {{ color:#1a1a1a; white-space:nowrap; flex:1; overflow:hidden; text-overflow:ellipsis; }}
.pk .fn {{ font-weight:800; }}
.fk .fn {{ color:#2b5f8a; }}
.ty {{ color:#808080; font-size:9px; margin-left:6px; flex-shrink:0; }}
.eft {{
  height:12px; background:#f2f2f2; color:#9aa3ab;
  font-size:8.5px; display:flex; align-items:center; padding:0 6px;
  border-top:1px solid #e2e2e2;
}}
.eft i {{ font-style:normal; margin-left:3px; font-size:7px; }}
svg.ln {{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }}
.right {{ flex:1; min-width:0; display:flex; flex-direction:column; height:{left_h}px; }}
.ttl {{ font-size:16px; font-weight:700; margin-bottom:6px; height:22px; }}
table {{ width:100%; border-collapse:collapse; table-layout:fixed; flex:1; }}
th, td {{
  border:1px solid #9aa7b4; font-size:{font}px; height:{row_h}px; vertical-align:middle;
}}
th {{ background:#c5d8ea; font-weight:700; text-align:center; }}
tbody tr:nth-child(even) td {{ background:#eef4f8; }}
td.nm {{ padding:0 8px; text-align:left; font-weight:600; }}
td.c {{ text-align:center; }}
td.desc {{ padding:0 8px; text-align:left; }}
</style></head>
<body>
<section class="page">
  <div class="left">
    <div class="erd-ttl">ㅇ 테이블 구성도</div>
    {''.join(box_htmls)}
    <svg class="ln" viewBox="0 0 {LEFT_W} {left_h}">
      {''.join(path_d)}
      {''.join(lab)}
    </svg>
  </div>
  <div class="right">
    <div class="ttl">&lt; {html.escape(name)} 테이블 &gt;</div>
    <table>
      <colgroup>
        <col style="width:22%"/><col style="width:14%"/><col style="width:10%"/>
        <col style="width:20%"/><col style="width:9%"/><col/>
      </colgroup>
      <thead>
        <tr>
          <th>항목명</th><th>Type</th><th>필수/선택</th>
          <th>값 목록</th><th>활성여부</th><th>설명</th>
        </tr>
      </thead>
      <tbody>{spec_rows(cols)}</tbody>
    </table>
  </div>
</section>
</body></html>
"""
    return html_out, page_h


def main() -> None:
    import json

    OUT.mkdir(parents=True, exist_ok=True)
    heights = {}
    for name in TABLES:
        html_out, page_h = render(name)
        (OUT / f"{name}.html").write_text(html_out, encoding="utf-8")
        heights[name] = page_h
    (OUT / "_heights.json").write_text(json.dumps(heights), encoding="utf-8")
    print(f"wrote {len(TABLES)} combined slides → {OUT}")
    print("heights", heights)


if __name__ == "__main__":
    main()
