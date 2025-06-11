# 🎨 GreenRevolution One-page Tailwindcss

## 📝 Opis  
One-page landing page stworzona w podejściu mobile-first, wykorzystująca Tailwind CSS jako główny framework do responsywnego układu. Sekcje strony (m.in. hero,  footer) zbudowano przy pomocy narzędzi Flexbox i Grid dostępnych w Tailwind. Dodatkowo dodano karuzelę TW-Elements. Projekt został dostosowany do potrzeb klienta, z anonimizacją danych testowych oraz optymalizacją pod kątem SEO. W przeciwieństwie do niektórych poprzednich realizacji, nie zawiera osobnych stron 404 ani polityki prywatności.

## 🔗 Demo  
👉 [Zobacz stronę na żywo](https://migacz-dawid.github.io/greenrevolution-one-page-tailwindcss/)  

## 💻 Technologie  
• HTML5  
• Tailwind CSS  
• TW-Elements  
• JavaScript (ES6)  
• SEO, Mobile-First  
• Flexbox, Grid

## 📂 Uruchomienie projektu  
1. Sklonuj repozytorium  
   ```bash
1.	Sklonuj repozytorium:
git clone https://github.com/migacz-dawid/greenrevolution-one-page-tailwindcss
2.	Przejdź do katalogu projektu:
cd one-page-tailwindcss
3.	Zainstaluj zależności:
npm install
4.	Wygeneruj CSS z Tailwind i skopiuj TW-Elements:
npm run build:full
o	build wygeneruje docs/output.css
o	postbuild stworzy docs/js i skopiuje tw-elements.min.js
5.	(Opcjonalnie) Podgląd na żywo z watch mode:
npm run watch
