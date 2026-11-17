import sys, pymupdf
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners/pdfs/ru'
pid, out = sys.argv[1], sys.argv[2]
pages = [int(x) for x in sys.argv[3:]]
src = pymupdf.open(R / f'{pid}.pdf')
cols = 3
rows = (len(pages) + cols - 1) // cols
W, H = 612, 792
sheet = pymupdf.open()
pg = sheet.new_page(width=W * cols, height=H * rows)
for k, n in enumerate(pages):
    r = pymupdf.Rect((k % cols) * W, (k // cols) * H, (k % cols + 1) * W, (k // cols + 1) * H)
    pg.show_pdf_page(r, src, n - 1)
pg.get_pixmap(dpi=62).save(out)
