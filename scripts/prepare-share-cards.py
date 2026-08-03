"""Create CBTI share-card assets with a small, scan-safe QR code overlay."""

from __future__ import annotations

import argparse
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw
from qrcode.constants import ERROR_CORRECT_H


CARD_FILES = {
    "HOLD": "微信图片_20260803173741_866_2327.jpg",
    "SOLO": "微信图片_20260803173741_867_2327.jpg",
    "IMOK": "微信图片_20260803173742_868_2327.jpg",
    "IDOL": "微信图片_20260803173743_869_2327.jpg",
    "LOL": "微信图片_20260803173743_870_2327.jpg",
    "HUGS": "微信图片_20260803173744_871_2327.jpg",
    "RETRY": "微信图片_20260803173745_872_2327.jpg",
    "SUGR": "微信图片_20260803173746_873_2327.jpg",
    "OKOK": "微信图片_20260803173746_874_2327.jpg",
    "YOLO": "微信图片_20260803173747_875_2327.jpg",
    "LOAD": "微信图片_20260803173747_876_2327.jpg",
    "WHY": "微信图片_20260803173748_877_2327.jpg",
}


def make_qr(url: str) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=4,
        border=3,
    )
    qr.add_data(url)
    qr.make(fit=True)
    return qr.make_image(fill_color="#2b180d", back_color="#fffaf0").convert("RGB")


def add_qr(card: Image.Image, qr_image: Image.Image) -> Image.Image:
    card = card.convert("RGB")
    backing_size = qr_image.width + 18
    backing = Image.new("RGBA", (backing_size, backing_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(backing)
    draw.rounded_rectangle(
        (0, 0, backing_size - 1, backing_size - 1),
        radius=10,
        fill=(255, 250, 240, 242),
        outline=(102, 65, 38, 180),
        width=2,
    )
    backing.paste(qr_image.convert("RGBA"), (9, 9))

    x = card.width - backing.width - 28
    y = card.height - backing.height - 26
    card_rgba = card.convert("RGBA")
    card_rgba.alpha_composite(backing, (x, y))
    return card_rgba.convert("RGB")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--url", default="https://www.cbtidd.top")
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    qr_image = make_qr(args.url)
    qr_image.save(args.output_dir / "site-qr.png", optimize=True)

    for code, filename in CARD_FILES.items():
        source = args.input_dir / filename
        if not source.exists():
            raise FileNotFoundError(source)
        with Image.open(source) as image:
            output = add_qr(image, qr_image)
            output.save(
                args.output_dir / f"{code}.jpg",
                quality=94,
                optimize=True,
                progressive=True,
                subsampling=0,
            )
        print(f"prepared {code}")


if __name__ == "__main__":
    main()
