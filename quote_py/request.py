import random
import requests
from bs4 import BeautifulSoup
import chardet

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/91.0.4472.124 Safari/537.36"
    )
}

BASE_URL = "https://www.citatum.hu/kategoria/matematika"

def select_link() -> str:
    """Random oldal kiválasztása az adott oldalról. (BASE_URL)-ről."""
    return f"{BASE_URL}/{random.randint(1, 34)}" if random.randint(0, 1) else BASE_URL

def fetch_page_content(url: str) -> str:
    """Fetcheli az oldalrol az idezetet és decodeolja"""
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()

        encoding = chardet.detect(response.content).get("encoding", "ISO-8859-2")
        return response.content.decode(encoding)

    except requests.RequestException as e:
        print(f"Error fetching page: {e}")
        return ""

def extract_quotes(html: str) -> list[str]:
    """Kiveszi az idezetet a html elemből."""
    soup = BeautifulSoup(html, "html.parser")
    return [
        p.get_text(strip=True)
        for p in soup.select("div[id] p:not([class]):not([id])")
        if p.get_text(strip=True)
    ]

def get_random_quote() -> str:
    """Fetchel és visszaad egy random idézetet."""
    html_content = fetch_page_content(select_link())
    quotes = extract_quotes(html_content)
    return random.choice(quotes) if quotes else "Nem volt idézet!"

if __name__ == "__main__":
    print(get_random_quote())