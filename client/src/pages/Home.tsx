/**
 * RUANGSI — PETA STUDI
 * Neo-Swiss editorial academic journey: structured warmth, asymmetric momentum,
 * paper-cream surfaces, ink-navy authority, Signal Cyan actions, and purposeful motion.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { buildWhatsAppUrl, RUANGSI_INSTAGRAM_URL } from "@shared/contact";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  Compass,
  FileCheck2,
  FileText,
  Instagram,
  Layers3,
  Menu,
  MessageCircle,
  Network,
  PanelTop,
  Sparkles,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const serviceItems = [
  {
    code: "01",
    title: "Peta Topik",
    description: "Merapikan ide awal menjadi ruang lingkup, rumusan masalah, dan arah riset yang dapat dikerjakan.",
    output: "Output: topik, fokus & roadmap",
    icon: Compass,
  },
  {
    code: "02",
    title: "System Blueprint",
    description: "Mendampingi analisis kebutuhan, alur proses, UML, ERD, hingga rancangan sistem yang masuk akal.",
    output: "Output: model sistem & diagram",
    icon: Network,
  },
  {
    code: "03",
    title: "Metode & Data",
    description: "Membaca kecocokan metode, instrumen, kebutuhan data, dan cara menjelaskan pilihan risetmu.",
    output: "Output: kerangka metode yang jelas",
    icon: FileText,
  },
  {
    code: "04",
    title: "Review Naskah",
    description: "Merapikan alur argumentasi, konsistensi istilah, serta catatan revisi agar naskah lebih mudah diperbaiki.",
    output: "Output: catatan review terarah",
    icon: FileCheck2,
  },
  {
    code: "05",
    title: "UI/UX Prototype",
    description: "Membantu menerjemahkan kebutuhan pengguna ke wireframe dan prototype untuk proyek berbasis aplikasi.",
    output: "Output: prototype & alasan desain",
    icon: PanelTop,
  },
  {
    code: "06",
    title: "Simulasi Sidang",
    description: "Melatih cara mempresentasikan keputusan riset, menjawab pertanyaan, dan memegang alur saat diuji.",
    output: "Output: daftar latihan & fokus presentasi",
    icon: BookOpenCheck,
  },
];

const projectItems = [
  {
    id: "A1",
    kind: "DEMO CONCEPT",
    title: "Sistem Inventori Kampus",
    tags: ["Requirements", "ERD", "Flow"],
    hue: "cyan",
    description: "Contoh bagaimana masalah stok yang berulang dipetakan menjadi alur aktor, data, dan tampilan yang saling terhubung.",
  },
  {
    id: "B2",
    kind: "DEMO CONCEPT",
    title: "Dashboard Layanan Publik",
    tags: ["Research", "Dashboard", "UX"],
    hue: "orange",
    description: "Contoh studi dashboard yang menekankan kebutuhan pengguna, prioritas informasi, dan keputusan antarmuka.",
  },
  {
    id: "C3",
    kind: "DEMO CONCEPT",
    title: "Portal Akademik Mahasiswa",
    tags: ["UML", "Prototype", "Testing"],
    hue: "navy",
    description: "Contoh perjalanan dari keluhan pengguna menjadi fitur, skenario uji, dan prototype yang siap dipresentasikan.",
  },
];

const classItems = [
  {
    no: "01",
    title: "Kelas Kilat Proposal",
    description: "Untuk yang ingin memulai dari masalah, topik, dan struktur proposal tanpa lompat langkah.",
    chips: ["Topik", "Rumusan", "Roadmap"],
  },
  {
    no: "02",
    title: "Lab Metodologi IT",
    description: "Untuk yang ingin memahami alasan memilih metode, data, instrumen, dan cara mempertahankannya.",
    chips: ["Metode", "Data", "Instrumen"],
  },
  {
    no: "03",
    title: "Sprint Siap Sidang",
    description: "Untuk yang ingin merapikan narasi proyek dan berlatih menjelaskan keputusan riset dengan lebih tenang.",
    chips: ["Slide", "Narasi", "Q&A"],
  },
];

const faqs = [
  {
    question: "RuangSI bantu sampai tahap apa?",
    answer:
      "RuangSI diposisikan sebagai pendampingan edukatif: memetakan topik, metode, perancangan sistem, review, prototype, serta latihan presentasi. RuangSI tidak menggantikan tanggung jawab akademik mahasiswa atau menjanjikan hasil instan.",
  },
  {
    question: "Apakah hanya untuk Sistem Informasi?",
    answer:
      "Fokus utamanya adalah Sistem Informasi, Informatika, dan proyek IT yang membutuhkan pemetaan masalah, rancangan sistem, data, metode, atau UI/UX. Kecocokan kebutuhan dibahas terlebih dahulu saat konsultasi.",
  },
  {
    question: "Bagaimana format bimbingannya?",
    answer:
      "Format dapat disusun sebagai konsultasi per sesi, pendampingan berkala, atau kelas terarah. Detail sesi, jadwal, kanal komunikasi, dan ruang lingkup akan disesuaikan setelah kebutuhanmu dipetakan.",
  },
  {
    question: "Kalau draft saya masih berantakan, apakah boleh mulai?",
    answer:
      "Boleh. Bawa apa pun yang sudah ada—ide, catatan dosen, judul sementara, atau draft. Sesi awal berfungsi untuk memisahkan masalah utama, informasi yang sudah kuat, dan langkah berikutnya yang realistis.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand-lockup compact" : "brand-lockup"} aria-label="RuangSI">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__route" />
        <span className="brand-mark__node brand-mark__node--one" />
        <span className="brand-mark__node brand-mark__node--two" />
      </span>
      <span className="brand-word">ruang<span>SI</span></span>
    </div>
  );
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      <p>{children}</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openRegistration = (context = "pendaftaran") => {
    setLocation(`/pesan?intent=${encodeURIComponent(context)}`);
  };

  const openWhatsApp = (context = "konsultasi") => {
    window.open(buildWhatsAppUrl(context), "_blank", "noopener,noreferrer");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Lewati ke isi</a>

      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <div className="header-inner">
          <a href="#beranda" onClick={closeMenu} className="brand-link">
            <BrandMark compact />
          </a>
          <nav className={menuOpen ? "desktop-nav is-open" : "desktop-nav"} aria-label="Navigasi utama">
            <a href="#layanan" onClick={closeMenu}>Layanan</a>
            <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
            <a href="#kelas" onClick={closeMenu}>Kelas</a>
            <a href="#cerita" onClick={closeMenu}>Cerita</a>
            <a href="#cara-kerja" onClick={closeMenu}>Alur</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <button className="nav-consult-mobile" onClick={() => { closeMenu(); openWhatsApp("konsultasi"); }}>
              Konsultasi <ArrowUpRight size={16} />
            </button>
          </nav>
          <div className="header-actions">
            <button className="button button--compact button--dark" onClick={() => openWhatsApp("konsultasi")}>
              <MessageCircle size={16} />
              <span>Konsultasi</span>
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section id="beranda" className="hero-section">
          <div className="hero-paper hero-paper--one" aria-hidden="true" />
          <div className="hero-paper hero-paper--two" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-wrap">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={reveal} className="eyebrow-pill">
                <span className="status-dot" />
                Bimbingan Skripsi · SI & IT
              </motion.div>
              <motion.h1 variants={reveal}>
                Topikmu belum rapi?<br />
                <em>Kita petakan dulu,</em><br />
                baru melangkah.
              </motion.h1>
              <motion.p variants={reveal}>
                RuangSI membantu mahasiswa Sistem Informasi dan bidang IT menyusun proses skripsi yang lebih jelas—dari ide awal, rancangan sistem, hingga siap presentasi.
              </motion.p>
              <motion.div variants={reveal} className="hero-actions">
                <button className="button button--signal" onClick={() => openWhatsApp("konsultasi skripsi SI atau IT")}>Buka konsultasi <ArrowUpRight size={18} /></button>
                <a className="button button--text" href="#layanan">Lihat cara kerja <ArrowDownRight size={18} /></a>
              </motion.div>
              <motion.div variants={reveal} className="hero-note">
                <span>01</span>
                <p>Mulai dari draft apa pun yang sudah kamu punya.</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
              aria-label="Visual peta alur bimbingan skripsi"
            >
              <div className="hero-visual__caption">RUANGSI / STUDY SIGNAL BOARD</div>
              <div className="hero-orbit hero-orbit--one" />
              <div className="hero-orbit hero-orbit--two" />
              <motion.div className="signal-path signal-path--one" animate={{ rotate: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="signal-path signal-path--two" animate={{ rotate: [0, -2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
              <div className="map-board">
                <div className="map-board__top"><span>RUANGSI / MAP_01</span><span>ACTIVE</span></div>
                <div className="map-board__ledger">
                  <span>TOPIC <b>SET</b></span><span>METHOD <b>MAP</b></span><span>SYSTEM <b>BUILD</b></span><span>STORY <b>READY</b></span>
                </div>
                <div className="map-board__main">
                  <div className="map-node map-node--a"><span>IDE</span></div>
                  <div className="map-node map-node--b"><span>DATA</span></div>
                  <div className="map-node map-node--c"><span>FLOW</span></div>
                  <div className="route-line route-line--one" />
                  <div className="route-line route-line--two" />
                  <div className="route-line route-line--three" />
                  <div className="map-board__tag">MAP THE<br />PROBLEM <small>METHOD / DATA / FLOW</small></div>
                </div>
                <div className="map-board__foot"><span>PROGRESS</span><div><i /><i /><i /><i /></div><span>04</span></div>
              </div>
              <div className="visual-float visual-float--one"><Sparkles size={16} /><span>guided</span></div>
              <div className="visual-float visual-float--two"><Check size={15} /><span>reviewed</span></div>
              <div className="visual-index">01—06</div>
            </motion.div>
          </div>
          <div className="hero-bottom-strip">
            <span>TOPIC</span><i /><span>METHOD</span><i /><span>SYSTEM</span><i /><span>STORY</span><i /><span>SIDANG</span>
          </div>
        </section>

        <section className="intro-section">
          <div className="section-frame intro-frame">
            <SectionLabel number="00">Kenapa mulai dari peta?</SectionLabel>
            <div className="intro-content">
              <p className="display-copy">Skripsi IT bukan sekadar “membuat aplikasi”. Ia adalah proses <em>menerjemahkan masalah</em> menjadi keputusan riset dan sistem yang bisa kamu jelaskan.</p>
              <div className="intro-stamp"><span>RUANGSI</span><b>GUIDED<br />PROCESS</b><i /></div>
            </div>
          </div>
        </section>

        <section id="layanan" className="services-section section-dark">
          <div className="section-frame">
            <div className="section-heading section-heading--light">
              <SectionLabel number="01">Apa yang bisa dipetakan</SectionLabel>
              <div>
                <h2>Ruang bantuan untuk<br /><em>setiap titik macetmu.</em></h2>
                <p>Bukan paket jawaban instan. Pilih pendampingan sesuai tahap yang sedang kamu hadapi, lalu kita pecah menjadi langkah kecil yang dapat dijalankan.</p>
              </div>
            </div>
            <div className="services-list">
              {serviceItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    className="service-card"
                    key={item.code}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    transition={{ delay: index * 0.045, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="service-card__meta"><span>{item.code}</span><Icon size={19} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="service-card__foot"><span>{item.output}</span><button onClick={() => openWhatsApp(item.title)} aria-label={`Tanya layanan ${item.title} via WhatsApp`}><ArrowUpRight size={18} /></button></div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio-section">
          <div className="section-frame">
            <div className="section-heading">
              <SectionLabel number="02">Peta hasil kerja</SectionLabel>
              <div>
                <h2>Contoh cara berpikir<br />untuk <em>proyek IT.</em></h2>
                <p>Ini adalah demo konsep untuk menunjukkan jenis pemetaan yang bisa dikembangkan bersama. Bukan klaim proyek klien.</p>
              </div>
            </div>
            <div className="portfolio-grid">
              {projectItems.map((item, index) => (
                <motion.article
                  className={`project-card project-card--${item.hue}`}
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="project-card__top"><span>{item.kind}</span><span>{item.id}</span></div>
                  <div className="project-art" aria-hidden="true">
                    <div className="project-art__panel project-art__panel--a" />
                    <div className="project-art__panel project-art__panel--b" />
                    <div className="project-art__node project-art__node--1" />
                    <div className="project-art__node project-art__node--2" />
                    <div className="project-art__line project-art__line--1" />
                    <div className="project-art__line project-art__line--2" />
                    <span className="project-art__label project-art__label--one">REQUIREMENT</span>
                    <span className="project-art__label project-art__label--two">METHOD / DATA</span>
                  </div>
                  <div className="project-card__copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="project-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="portfolio-cta"><p>Punya masalah proyek yang belum masuk kategori di atas?</p><button className="button button--outline" onClick={() => openWhatsApp("proyek IT")}>Ceritakan topikmu <ArrowUpRight size={17} /></button></div>
          </div>
        </section>

        <section id="cara-kerja" className="process-section">
          <div className="section-frame process-frame">
            <div className="section-heading">
              <SectionLabel number="03">Cara kerja</SectionLabel>
              <div><h2>Jelas dari awal.<br /><em>Ringan saat dijalankan.</em></h2></div>
            </div>
            <div className="process-track">
              <div className="process-line" aria-hidden="true" />
              {[
                ["01", "Bawa yang sudah ada", "Judul sementara, catatan dosen, ide, atau draft yang belum rapi."],
                ["02", "Petakan inti masalah", "Kita tandai tujuan, batasan, data, dan keputusan yang perlu kamu pegang."],
                ["03", "Jalankan sesi terarah", "Bimbingan mengikuti roadmap yang disepakati—bukan membahas semuanya sekaligus."],
                ["04", "Rapikan cara bercerita", "Susun naskah, prototype, atau presentasi supaya logikanya mudah dipahami."],
              ].map(([number, title, description], index) => (
                <motion.div
                  className="process-step"
                  key={number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={reveal}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <div className="process-step__node"><span>{number}</span></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="kelas" className="class-section section-dark">
          <div className="section-frame">
            <div className="class-top">
              <div className="section-heading section-heading--light">
                <SectionLabel number="04">Belajar dalam ruang yang sama</SectionLabel>
                <div><h2>Bukan cuma dibantu.<br /><em>Kamu juga dibimbing paham.</em></h2></div>
              </div>
              <p className="class-top__note">Program kelas dirancang untuk mahasiswa yang ingin menguasai alur berpikirnya—agar keputusan riset dapat dijelaskan kembali dengan percaya diri.</p>
            </div>
            <div className="class-grid">
              {classItems.map((item, index) => (
                <motion.article className="class-card" key={item.no} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} transition={{ delay: index * 0.08, duration: 0.45 }}>
                  <div className="class-card__number">{item.no}</div>
                  <div className="class-card__body"><h3>{item.title}</h3><p>{item.description}</p><div>{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div></div>
                  <button className="class-card__action" onClick={() => openRegistration(item.title)} aria-label={`Daftar ${item.title}`}><ArrowUpRight size={20} /></button>
                </motion.article>
              ))}
            </div>
            <div className="poster-deck">
              <div className="poster-card poster-card--service">
                <div className="poster-kicker">RUANGSI / SERVICE</div>
                <div className="poster-route" aria-hidden="true"><i /><i /><i /></div>
                <h3>BIMBINGAN<br />SKRIPSI</h3>
                <p>SISTEM INFORMASI<br />&amp; IT</p>
                <b>Dari topik sampai<br />siap presentasi.</b>
                <div className="poster-foot">KONSULTASI VIA WHATSAPP <ArrowUpRight size={14} /></div>
              </div>
              <div className="poster-card poster-card--class">
                <div className="poster-kicker">RUANGSI / CLASS</div>
                <div className="poster-milestones" aria-hidden="true"><i>01</i><i>02</i><i>03</i></div>
                <h3>KELAS PROPOSAL<br />&amp; METODOLOGI IT</h3>
                <p>Belajar bikin alur riset<br />yang masuk akal.</p>
                <b>BIMBINGAN TERARAH</b>
                <div className="poster-foot">DAFTAR KELAS <ArrowUpRight size={14} /></div>
              </div>
              <div className="poster-copy"><span>POSTER SERIES / 01—02</span><h3>Visual promo yang siap menjadi materi awal media sosialmu.</h3><p>Dua poster live ini dibuat dalam sistem visual yang sama dengan website sehingga pesan brand tetap konsisten di setiap touchpoint.</p><button className="button button--outline-light" onClick={() => openRegistration("poster dan kelas")}>Daftar program kelas <ArrowUpRight size={17} /></button></div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-frame faq-frame">
            <div className="faq-side">
              <SectionLabel number="05">Pertanyaan awal</SectionLabel>
              <h2>Tenang, kita mulai dari <em>yang sudah kamu tahu.</em></h2>
              <div className="faq-side__signal"><span className="status-dot" /> RUANGSI MENJAGA PROSESNYA TETAP JELAS</div>
            </div>
            <Accordion type="single" collapsible className="faq-list">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="faq-item">
                  <AccordionTrigger className="faq-trigger"><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}</AccordionTrigger>
                  <AccordionContent className="faq-content">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="cerita" className="stories-section">
          <div className="section-frame stories-frame">
            <div className="stories-side">
              <SectionLabel number="06">Cerita dengan izin</SectionLabel>
              <h2>Bukti sosial harus <em>setulus prosesnya.</em></h2>
              <p>RuangSI hanya akan menampilkan pengalaman mahasiswa yang benar-benar diberikan dan disetujui untuk dipublikasikan.</p>
            </div>
            <div className="stories-empty">
              <div className="stories-empty__stamp"><Check size={26} /></div>
              <span>AUTHENTIC STORIES / PENDING</span>
              <h3>Ruang untuk cerita mahasiswa sedang disiapkan.</h3>
              <p>Testimoni, nama atau inisial, serta hasil yang boleh diklaim akan ditambahkan setelah materi asli beserta izin publikasinya diterima.</p>
              <div><i /> Tidak ada rating, ulasan, atau angka keberhasilan yang dibuat-buat.</div>
            </div>
          </div>
        </section>

        <section id="hubungi" className="contact-section">
          <div className="contact-orb contact-orb--one" aria-hidden="true" /><div className="contact-orb contact-orb--two" aria-hidden="true" />
          <div className="section-frame contact-frame">
            <div className="contact-stamp"><span>RUANGSI</span><b>LET'S<br />MAP IT</b></div>
            <div className="contact-copy">
              <p className="contact-kicker">LANGKAH PERTAMA / 10 MENIT</p>
              <h2>Ceritakan topikmu.<br /><em>Kita cari titik mulai.</em></h2>
              <p>Belum perlu rapi. Bawa judul sementara, catatan revisi, atau cerita singkat tentang proyekmu. Nanti kita petakan jalan berikutnya.</p>
              <div className="contact-route" aria-hidden="true"><span>TOPIK</span><i /><span>METODE</span><i /><span>SIDANG</span></div>
              <button className="button button--orange" onClick={() => openWhatsApp("konsultasi awal")}>Mulai konsultasi <MessageCircle size={18} /></button>
              <div className="contact-channels">
                <a href={buildWhatsAppUrl("konsultasi awal")} target="_blank" rel="noreferrer"><MessageCircle size={15} /> +62 895-6092-50509</a>
                <a href={RUANGSI_INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={15} /> @jago.jokitugas</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><BrandMark /><p>Ruang bimbingan terarah untuk mahasiswa Sistem Informasi dan IT.</p></div>
        <div className="footer-links"><a href="#layanan">Layanan</a><a href="#kelas">Kelas</a><a href="#cerita">Cerita</a><a href="#faq">FAQ</a><a href={RUANGSI_INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><button onClick={() => openWhatsApp("konsultasi dari footer")}>WhatsApp <ArrowUpRight size={14} /></button></div>
        <div className="footer-bottom"><span>© 2026 RuangSI</span><span>Pendampingan edukatif, bukan pengganti tanggung jawab akademik.</span></div>
      </footer>
    </div>
  );
}
