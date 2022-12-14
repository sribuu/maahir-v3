export const resellerPaymentGuide = [
  {
    bank_name: "Mandiri",
    payment_options: [
      {
        payment_type: "ATM Mandiri",
        payment_guide: [
          {
            step: 1,
            instruction: "Masukkan kartu ATM dan PIN ATM.",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih menu Bayar/Beli.",
            highlight: [],
          },
          {
            step: 3,
            instruction: "Pilih opsi Lainnya",
            highlight: [],
          },
          {
            step: 4,
            instruction: "Pilih opsi Multipayment.",
            highlight: ["“KE REK. BCA VIRTUAL ACCOUNT“"],
          },
          {
            step: 5,
            instruction: "Masukkan nomor Virtual account",
            highlight: [],
          },
          {
            step: 6,
            instruction: "Klik Benar.",
            highlight: [],
          },
          {
            step: 7,
            instruction:
              "Layar akan menampilkan konfirmasi. Jika sesuai, pilih Ya.",
            highlight: [],
          },
          {
            step: 8,
            instruction: "Simpan bukti transaksi sebagai bukti pembayaran",
            highlight: [],
          },
        ],
      },
      {
        payment_type: "Livin Mandiri",
        payment_guide: [
          {
            step: 1,
            instruction:
              "Login Livin’ dengan Username dan Password Anda lalu masuk ke menu Bayar",
            highlight: [],
          },
          {
            step: 2,
            instruction:
              "Tap di menu Pembayaran Baru kemudian pilih Multipayment.",
            highlight: [],
          },
          {
            step: 3,
            instruction:
              "Tentukan Rekening Sumber yang akan anda pakai lalu tap isian Penyedia Jasa.",
            highlight: ["Transfer ke BCA Virtual Account"],
          },
          {
            step: 4,
            instruction:
              "Pada kolom pencarian, ketik Transferpay sebagai penyedia jasa atau masukan kode perusahaan 70014",
            highlight: [],
          },
          {
            step: 5,
            instruction: "Masukkan Nomor Virtual Account lalu tekan Lanjut.",
            highlight: [],
          },
          {
            step: 6,
            instruction:
              "Centang jumlah bayar dan tekan Lanjut. Transaksi selesai setelah Anda Konfirmasi dan masukkan MPIN.",
            highlight: [],
          },
          {
            step: 6,
            instruction: "Simpan bukti transaksi sebagai bukti pembayaran",
            highlight: [],
          },
        ],
      },
      {
        payment_type: "Internet Banking Mandiri",
        payment_guide: [
          {
            step: 1,
            instruction:
              "Akses situs Mandiri Online, masukkan username dan password.",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih menu Bayar",
            highlight: ["m-BCA"],
          },
          {
            step: 3,
            instruction: "Pilih opsi Multipayment.",
            highlight: ["m-Transfer"],
          },
          {
            step: 4,
            instruction: "Pilih Penyedia Jasa yang digunakan",
            highlight: [],
          },
          {
            step: 5,
            instruction: "Masukkan nomor Virtual Account ",
            highlight: [],
          },
          {
            step: 6,
            instruction: "Layar akan menampilkan konfirmasi.",
            highlight: [],
          },
          {
            step: 7,
            instruction:
              "Jika sudah sesuai, masukkan PIN transaksi dan akhiri dengan OK.",
            highlight: [],
          },
        ],
      },

      {
        payment_type: "Teller BRI",
        payment_guide: [
          {
            step: 1,
            instruction:
              "Ambil nomor antrian transaksi Teller dan isi slip setoran dengan nomor Virtual Account sebagai rekening tujuan",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Serahkan slip dan jumlah setoran kepada Teller BRI",
            highlight: [],
          },
          {
            step: 3,
            instruction: "Teller BRI akan melakukan validasi transaksi",
            highlight: [],
          },
          {
            step: 4,
            instruction:
              "Simpan slip setoran hasil validasi sebagai bukti pembayaran",
            highlight: [],
          },
        ],
      },
    ],
  },
  {
    bank_name: "BRI",
    payment_options: [
      {
        payment_type: "ATM BRI",
        payment_guide: [
          {
            step: 1,
            instruction: "Masukkan kartu ATM BRI dan PIN ATM BRI Anda",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih menu TRANSAKSI LAIN",
            highlight: ["“TRANSAKSI LAINNYA“"],
          },
          {
            step: 3,
            instruction: "Pilih menu PEMBAYARAN",
            highlight: ["“TRANSFER“"],
          },
          {
            step: 4,
            instruction: "Pilih menu LAINNYA ",
            highlight: ["“KE REK. BCA VIRTUAL ACCOUNT“"],
          },
          {
            step: 5,
            instruction: "Pilih menu BRIVA",
            highlight: ["“BENAR“"],
          },
          {
            step: 6,
            instruction: "Masukkan nomor Virtual Account untuk pesanan anda",
            highlight: ["“BENAR“"],
          },
          {
            step: 7,
            instruction: "Pilih Ya untuk memproses pembayaran",
            highlight: ["“YA“", "“TIDAK”"],
          },
          {
            step: 8,
            instruction: "Simpan struk transaksi sebagai bukti pembayaran",
            highlight: ["“TIDAK”"],
          },
        ],
      },
      {
        payment_type: "BRImo",
        payment_guide: [
          {
            step: 1,
            instruction: "Masukan username dan password anda di aplikasi BRImo",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih menu BRIVA",
            highlight: [],
          },
          {
            step: 3,
            instruction:
              "Pilih sumber dana kemudian masuklan nomor Virtual Account anda",
            highlight: ["Transfer ke BCA Virtual Account"],
          },
          {
            step: 4,
            instruction:
              "Pada halaman konfirmasi, pastikan detail pembayaran sudah sesuai (nomor BRIVA dan jumlah pembayaran)",
            highlight: [],
          },
          {
            step: 5,
            instruction: "Ikuti instruksi untuk menyelesaikan transaksi",
            highlight: [],
          },
          {
            step: 6,
            instruction: "Simpan bukti transaksi sebagai bukti pembayaran",
            highlight: [],
          },
        ],
      },
      {
        payment_type: "Internet Banking BRI",
        payment_guide: [
          {
            step: 1,
            instruction: "Login pada halaman Internet Banking BRI",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih menu Pembayaran",
            highlight: ["m-BCA"],
          },
          {
            step: 3,
            instruction: "Pilih menu BRIVA",
            highlight: ["m-Transfer"],
          },
          {
            step: 4,
            instruction: "Masukkan nomor Virtual Account untuk pesanan anda",
            highlight: [],
          },
          {
            step: 5,
            instruction: "Masukkan password Internet Banking BRI",
            highlight: [],
          },
          {
            step: 6,
            instruction: "Masukkan mToken Internet Banking BRI",
            highlight: [],
          },
          {
            step: 7,
            instruction: "Simpan bukti transaksi sebagai bukti pembayaran",
            highlight: [],
          },
        ],
      },

      {
        payment_type: "Teller BRI",
        payment_guide: [
          {
            step: 1,
            instruction:
              "Ambil nomor antrian transaksi Teller dan isi slip setoran dengan nomor Virtual Account sebagai rekening tujuan",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Serahkan slip dan jumlah setoran kepada Teller BRI",
            highlight: [],
          },
          {
            step: 3,
            instruction: "Teller BRI akan melakukan validasi transaksi",
            highlight: [],
          },
          {
            step: 4,
            instruction:
              "Simpan slip setoran hasil validasi sebagai bukti pembayaran",
            highlight: [],
          },
        ],
      },
    ],
  },
  {
    bank_name: "BCA",
    payment_options: [
      {
        payment_type: "ATM BCA",
        payment_guide: [
          {
            step: 1,
            instruction: "Masukkan kartu ATM BCA dan PIN ATM BCA Anda",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih menu “TRANSAKSI LAINNYA“",
            highlight: ["“TRANSAKSI LAINNYA“"],
          },
          {
            step: 3,
            instruction: "Pilih menu “TRANSFER“",
            highlight: ["“TRANSFER“"],
          },
          {
            step: 4,
            instruction: "Pilih menu “KE REK. BCA VIRTUAL ACCOUNT“",
            highlight: ["“KE REK. BCA VIRTUAL ACCOUNT“"],
          },
          {
            step: 5,
            instruction:
              "Masukkan nomor Virtual Account yang Anda terima dari Sribuu, kemudian pilih “BENAR“",
            highlight: ["“BENAR“"],
          },
          {
            step: 6,
            instruction:
              "Jumlah yang harus anda bayarkan akan muncul pada layar. Pastikan semua informasi tersebut benar, kemudian pilih “BENAR“",
            highlight: ["“BENAR“"],
          },
          {
            step: 7,
            instruction:
              "Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No VA, Nama, Perus/Produk dan Total Pembayaran. Jika sudah benar pilih “YA“, atau pilih “TIDAK” jika data di layar masih salah",
            highlight: ["“YA“", "“TIDAK”"],
          },
          {
            step: 8,
            instruction:
              "Transaksi Anda sudah selesai, pilih “TIDAK” untuk tidak melanjutkan transaksi lain.",
            highlight: ["“TIDAK”"],
          },
          {
            step: 9,
            instruction: "Terakhir, ambil kartu ATM BCA Anda",
            highlight: [],
          },
        ],
      },
      {
        payment_type: "Klik BCA",
        payment_guide: [
          {
            step: 1,
            instruction: "Login ke KlikBCA Individual",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih Menu Transfer",
            highlight: ["Transfer"],
          },
          {
            step: 3,
            instruction: "Pilih Menu Transfer ke BCA Virtual Account",
            highlight: ["Transfer ke BCA Virtual Account"],
          },
          {
            step: 4,
            instruction: "Masukkan Nomor Virtual Account untuk pesanan anda",
            highlight: [],
          },
          {
            step: 5,
            instruction: "Pilih Lanjutkan untuk melanjutkan pembayaran",
            highlight: [],
          },
          {
            step: 6,
            instruction:
              "Masukkan RESPON KEYBCA APPLI 1 yang muncul pada Token BCA,lalu klik tombol Kirim",
            highlight: ["RESPON KEYBCA APPLI 1 "],
          },
        ],
      },
      {
        payment_type: "Mobile Banking BCA",
        payment_guide: [
          {
            step: 1,
            instruction: "Buka Aplikasi BCA Mobile",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Pilih Menu m-BCA",
            highlight: ["m-BCA"],
          },
          {
            step: 3,
            instruction: "Pilih Menu m-Transfer",
            highlight: ["m-Transfer"],
          },
          {
            step: 4,
            instruction: "Pilih Opsi BCA Virtual Account",
            highlight: ["BCA Virtual Account"],
          },
          {
            step: 5,
            instruction:
              "Masukkan Nomor Virtual Account untuk pesanan anda, lalu klik tombol OK",
            highlight: ["“BENAR“"],
          },
          {
            step: 6,
            instruction:
              "Klik tombol Send yang berada di sudut kanan atas aplikasi untuk melakukan transfer",
            highlight: ["Send“"],
          },
          {
            step: 7,
            instruction: "Klik OK untuk melanjutkan pembayaran",
            highlight: ["OK"],
          },
          {
            step: 8,
            instruction: "Input PIN BCA untuk mengotorisasi transaksi",
            highlight: [],
          },
        ],
      },

      {
        payment_type: "Teller BCA",
        payment_guide: [
          {
            step: 1,
            instruction:
              "Ambil nomor antrian transaksi Teller dan isi slip setoran.",
            highlight: [],
          },
          {
            step: 2,
            instruction: "Serahkan slip dan jumlah setoran kepada Teller BCA.",
            highlight: [],
          },
          {
            step: 3,
            instruction: "Teller BCA akan melakukan validasi transaksi.",
            highlight: ["m-Transfer"],
          },
          {
            step: 4,
            instruction:
              "Simpan slip setoran hasil validasi sebagai bukti pembayaran.",
            highlight: ["BCA Virtual Account"],
          },
        ],
      },
    ],
  },
];
