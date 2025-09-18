# Windows Clean-Up — ghid rapid
1) Deschide PowerShell în rădăcina repo-ului.
2) Rulează scanarea:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/scan_unused.ps1
   ```
   Editează `.scan_unused_src` și `.scan_unused_pub` pentru a păstra ce vrei.
3) Aplică:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/cleanup_apply.ps1
   ```
4) Build:
   ```powershell
   npm run build
   ```
