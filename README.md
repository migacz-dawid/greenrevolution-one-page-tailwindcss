# 🎨 GreenRevolution One-page Tailwindcss

## 📝 Opis  
One-page landing page stworzona w podejściu **mobile-first**, wykorzystująca **Tailwind CSS** jako główny framework do responsywnego układu. Sekcje strony (m.in. hero,  footer) zbudowano przy pomocy narzędzi **Flexbox** i **Grid** dostępnych w Tailwind. Dodatkowo dodano **karuzelę TW-Elements**. Projekt został dostosowany do potrzeb klienta, z anonimizacją danych testowych oraz optymalizacją pod kątem **SEO**. W przeciwieństwie do niektórych poprzednich realizacji, nie zawiera osobnych stron 404 ani polityki prywatności. Projekt został stworzony zgodnie z zasadami dostępności **(WCAG 2.1, poziom AA)** oraz najlepszymi praktykami **a11y**.

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
   git clone https://github.com/migacz-dawid/greenrevolution-one-page-tailwindcss
  
2. Przejdź do katalogu projektu: 
   ```bash
   cd greenrevolution-one-page-tailwindcss

3. Zainstaluj zależności:  
   ```bash
   npm install
  
4. Wygeneruj CSS z Tailwind i skopiuj TW-Elements: 
   ```bash
   npm run build:full
  
 + `build` wygeneruje `docs/output.css`
 + `postbuild` stworzy `docs/js` i skopiuje `tw-elements.min.js`
   
5. (Opcjonalnie) Podgląd na żywo z watch mode:
   ```bash
   npm run watch
 
