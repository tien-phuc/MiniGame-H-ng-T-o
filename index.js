const khung = document.getElementById("game-container");
const gio = document.getElementById("basket");
const tao = document.getElementById("apple");
const oDiem = document.getElementById("score");
const oMang = document.getElementById("lives");
const thongBao = document.getElementById("message");
const nutBatDau = document.getElementById("start-btn");

const BUOC_GIO = 25;
const TOC_DO_DAU = 2.5;
const TANG_TOC = 0.3;

const troChoi = {
  diem: 0,
  mangSong: 3,
  tocDo: TOC_DO_DAU,
  taoY: 0,
  boDem: null,

  hienThi() {
    oDiem.textContent = this.diem;
    oMang.textContent = this.mangSong;
    tao.style.top = this.taoY + "px";
  },

  taoMoi() {
    const toiDa = khung.clientWidth - tao.offsetWidth;
    tao.style.left = Math.random() * toiDa + "px";
    this.taoY = 0;
  },

  diChuyenGio(huong) {
    const toiDa = khung.clientWidth - gio.offsetWidth;
    let viTri = gio.offsetLeft + huong * BUOC_GIO;
    viTri = Math.max(0, Math.min(toiDa, viTri));
    gio.style.left = viTri + "px";
  },

  chamGio() {
    const t = tao.getBoundingClientRect();
    const g = gio.getBoundingClientRect();
    return (
      t.bottom >= g.top &&
      t.top < g.bottom &&
      t.right >= g.left &&
      t.left <= g.right
    );
  },

  chayMotBuoc() {
    this.taoY += this.tocDo;
    tao.style.top = this.taoY + "px";

    if (this.chamGio()) {
      this.diem++;
      this.tocDo += TANG_TOC;
      this.taoMoi();
    } else if (this.taoY + tao.offsetHeight >= khung.clientHeight) {
      this.mangSong--;
      this.taoMoi();
      if (this.mangSong <= 0) {
        this.mangSong = 0;
        this.hienThi();
        this.ketThuc();
        return;
      }
    }

    this.hienThi();
  },

  ketThuc() {
    clearInterval(this.boDem);
    this.boDem = null;
    thongBao.style.display = "flex";
    nutBatDau.textContent = "Chơi lại";
  },

  batDau() {
    clearInterval(this.boDem);
    this.diem = 0;
    this.mangSong = 3;
    this.tocDo = TOC_DO_DAU;
    gio.style.left = (khung.clientWidth - gio.offsetWidth) / 2 + "px";
    thongBao.style.display = "none";
    this.taoMoi();
    this.hienThi();
    this.boDem = setInterval(() => this.chayMotBuoc(), 20);
  },
};

document.addEventListener("keydown", (suKien) => {
  if (!troChoi.boDem) return;
  if (suKien.key === "ArrowLeft") {
    troChoi.diChuyenGio(-1);
    suKien.preventDefault();
  } else if (suKien.key === "ArrowRight") {
    troChoi.diChuyenGio(1);
    suKien.preventDefault();
  }
});

nutBatDau.addEventListener("click", () => {
  troChoi.batDau();
  nutBatDau.blur();
});

troChoi.hienThi();
