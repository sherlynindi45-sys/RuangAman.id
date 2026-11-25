/**
 * Google Apps Script - Penerima Laporan Simulasi Anti-Cyberbullying
 * Terintegrasi otomatis dengan Google Sheets tanpa mengambil data pribadi sensitif.
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Laporan_Simulasi");

    // Buat sheet dan header otomatis jika belum tersedia
    if (!sheet) {
      sheet = ss.insertSheet("Laporan_Simulasi");
      sheet.appendRow([
        "Timestamp Server",
        "Waktu Input",
        "Nama Samaran (Alias)",
        "Peran",
        "Kategori Perilaku",
        "Platform",
        "Deskripsi Simulasi"
      ]);
      sheet.getRange("A1:G1").setFontWeight("bold").setBackground("#ede9fe");
    }

    const data = JSON.parse(e.postData.contents);

    // Sanitasi sederhana untuk mencegah injeksi formula di Google Sheets (=, +, -, @)
    const sanitize = (val) => {
      const str = String(val || "").trim();
      return /^[=+\-@]/.test(str) ? "'" + str : str;
    };

    sheet.appendRow([
      new Date(),
      sanitize(data.waktu),
      sanitize(data.alias),
      sanitize(data.peran),
      sanitize(data.kategori),
      sanitize(data.platform),
      sanitize(data.kronologi)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Data simulasi tersimpan" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
