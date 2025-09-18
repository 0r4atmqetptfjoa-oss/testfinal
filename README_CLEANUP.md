# Cleanup Kit — “coș curat, elegant”

Acest pachet te ajută să:
- detectezi fișiere nefolosite (pagini, componente, imagini, JSON-uri din /public),
- cureți duplicatele și scheletele rămase,
- standardizezi repo-ul (formatting, ignore-uri).

## Pași rapizi
1) Copiază conținutul ZIP-ului în rădăcina repo-ului.
2) Rulează:
   ```bash
   bash scripts/scan_unused.sh > scan_report.txt
   bash scripts/cleanup_apply.sh
   ```
3) Deschide `scan_report.txt`, verifică lista. Revino și comentează liniile din `scripts/cleanup_apply.sh` dacă vrei să păstrezi ceva.
4) Rulează:
   ```bash
   npm run lint --silent || true
   npm run build
   ```

> Scripturile NU șterg nimic critic fără să verifice existența fișierelor și fără să-ți lase control (poți comenta/edita).
