/**
 * RUANGSI — PEMESANAN KELAS
 * A calm, form-led study route that records a student's context before the official Shopify checkout.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, CreditCard, ExternalLink, Loader2, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/commerce/types";

type FormState = {
  fullName: string;
  whatsapp: string;
  email: string;
  campus: string;
  studyProgram: string;
  thesisStage: string;
  topicNote: string;
};

const initialForm: FormState = {
  fullName: "",
  whatsapp: "",
  email: "",
  campus: "",
  studyProgram: "Sistem Informasi",
  thesisStage: "",
  topicNote: "",
};

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: currencyCode || "IDR", maximumFractionDigits: 0 }).format(Number(amount));
}

function CourseCard({ product, selected, onSelect }: { product: Product; selected: boolean; onSelect: () => void }) {
  const price = product.priceRange.min;
  return (
    <button className={selected ? "course-choice is-selected" : "course-choice"} onClick={onSelect} type="button">
      <span className="course-choice__marker"><CheckCircle2 size={16} /></span>
      <span className="course-choice__body"><b>{product.title}</b><small>{product.description || "Program bimbingan terarah RuangSI."}</small></span>
      <span className="course-choice__price">{formatPrice(price.amount, price.currencyCode)}</span>
    </button>
  );
}

export default function Order() {
  const { data: products = [], isLoading: catalogLoading, isError: catalogError } = trpc.commerce.products.list.useQuery({ first: 8 }, { retry: false, staleTime: 60_000 });
  const createBooking = trpc.booking.create.useMutation();
  const { cart, itemCount, addItem, loading: cartLoading, proceedToCheckout } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedHandle, setSelectedHandle] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [catalogWaited, setCatalogWaited] = useState(false);

  const selectedProduct = useMemo(() => products.find((product) => product.handle === selectedHandle) ?? null, [products, selectedHandle]);
  const busy = createBooking.isPending || cartLoading;

  useEffect(() => {
    if (!catalogLoading) {
      setCatalogWaited(false);
      return;
    }

    const timeoutId = window.setTimeout(() => setCatalogWaited(true), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [catalogLoading]);

  const setField = (field: keyof FormState, value: string) => setForm((previous) => ({ ...previous, [field]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBooking.mutateAsync({
        ...form,
        productHandle: selectedProduct?.handle,
        productTitle: selectedProduct?.title,
      });

      if (selectedProduct?.variants[0]) {
        await addItem(selectedProduct.variants[0].id, 1);
      }

      setSaved(true);
      toast.success(selectedProduct ? "Data pendaftaran tersimpan. Lanjutkan ke pembayaran." : "Minat pendaftaran sudah tercatat.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Pendaftaran belum dapat disimpan. Coba lagi.");
    }
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <Link href="/" className="order-brand"><span aria-hidden="true" className="order-brand__mark">R</span><b>ruang<span>SI</span></b></Link>
        <Link href="/" className="order-back"><ArrowLeft size={16} /> Kembali ke website</Link>
      </header>

      <main className="order-main">
        <section className="order-intro">
          <p className="order-kicker"><Sparkles size={14} /> PENDAFTARAN / RUANGSI</p>
          <h1>Ambil kelas yang sesuai dengan <em>titik mulamu.</em></h1>
          <p>Lengkapi konteks singkatmu terlebih dahulu. Jika program sudah aktif, data pendaftaran disimpan lalu kamu dapat meneruskan ke checkout aman Shopify.</p>
          <div className="order-steps"><span className="is-active">01 Pilih program</span><i /><span>02 Isi konteks</span><i /><span>03 Bayar aman</span></div>
          <div className="order-signal-board" aria-label="Tahap pendaftaran RuangSI">
            <span><b>TOPIK</b><i>CAPTURE</i></span><span><b>PROGRAM</b><i>SELECT</i></span><span><b>DATA</b><i>RECORDED</i></span><span><b>CHECKOUT</b><i>READY</i></span>
          </div>
        </section>

        <section className="order-layout">
          <form className="booking-form" onSubmit={submit}>
            <div className="form-heading"><span>01</span><div><h2>Tentang kamu</h2><p>Agar arah bimbingan bisa dipetakan sejak awal.</p></div></div>
            <div className="form-grid">
              <label>Nama lengkap<input required value={form.fullName} onChange={(event) => setField("fullName", event.target.value)} placeholder="Nama kamu" /></label>
              <label>WhatsApp<input required inputMode="tel" value={form.whatsapp} onChange={(event) => setField("whatsapp", event.target.value)} placeholder="Contoh: 62812…" /></label>
              <label>Email <small>opsional</small><input type="email" value={form.email} onChange={(event) => setField("email", event.target.value)} placeholder="nama@email.com" /></label>
              <label>Kampus <small>opsional</small><input value={form.campus} onChange={(event) => setField("campus", event.target.value)} placeholder="Nama kampus" /></label>
              <label>Program studi<input required value={form.studyProgram} onChange={(event) => setField("studyProgram", event.target.value)} placeholder="Contoh: Sistem Informasi" /></label>
              <label>Tahap skripsi<span className="select-wrap"><select required value={form.thesisStage} onChange={(event) => setField("thesisStage", event.target.value)}><option value="" disabled>Pilih tahap saat ini</option><option>Menentukan topik</option><option>Menyusun proposal</option><option>Merancang sistem</option><option>Mengolah data</option><option>Menyiapkan sidang</option></select><ChevronDown size={16} /></span></label>
              <label className="form-span">Ceritakan topik atau kendalamu <small>opsional</small><textarea value={form.topicNote} onChange={(event) => setField("topicNote", event.target.value)} placeholder="Contoh: Saya ingin mengangkat sistem inventori, tetapi masih bingung ruang lingkup dan metode." rows={4} /></label>
            </div>

            <div className="form-heading form-heading--program"><span>02</span><div><h2>Pilih program</h2><p>Katalog dan harga tampil langsung dari sistem kelas RuangSI.</p></div></div>
            {catalogLoading && !catalogWaited && <div className="catalog-state"><Loader2 className="spin" size={20} /> Memeriksa katalog kelas…</div>}
            {!catalogLoading && products.length > 0 && <div className="course-choices">{products.map((product) => <CourseCard key={product.id} product={product} selected={product.handle === selectedHandle} onSelect={() => { setSelectedHandle(product.handle); setSaved(false); }} />)}</div>}
            {((!catalogLoading && products.length === 0) || catalogWaited || catalogError) && <div className="catalog-state catalog-state--empty"><ShoppingBag size={20} /><div><b>Katalog kelas belum aktif.</b><span>Data minatmu tetap dapat dikirim sekarang. Pilihan kelas dan checkout muncul otomatis setelah program, harga, dan pembayaran resmi diaktifkan.</span></div></div>}
            {catalogError && <p className="form-note">Storefront belum tersedia saat ini. Data minat tetap dapat disimpan dengan aman.</p>}

            <div className="form-privacy"><span><CheckCircle2 size={15} /></span><p>Data ini digunakan untuk menindaklanjuti pendaftaran dan tidak dipublikasikan sebagai testimoni tanpa izin.</p></div>
            <button className="order-submit" type="submit" disabled={busy}>{busy ? <><Loader2 className="spin" size={18} /> Menyimpan…</> : selectedProduct ? <>Simpan & siapkan checkout <ArrowRight size={18} /></> : <>Kirim minat pendaftaran <ArrowRight size={18} /></>}</button>
          </form>

          <aside className="checkout-panel">
            <p className="checkout-panel__label">03 / RINGKASAN</p>
            <h2>Jalur pembayaran</h2>
            <div className="checkout-row"><span>Program</span><b>{selectedProduct?.title ?? "Belum dipilih"}</b></div>
            <div className="checkout-row"><span>Harga</span><b>{selectedProduct ? formatPrice(selectedProduct.priceRange.min.amount, selectedProduct.priceRange.min.currencyCode) : "Menunggu katalog"}</b></div>
            <div className="checkout-row"><span>Item di keranjang</span><b>{itemCount}</b></div>
            {saved && selectedProduct && cart && <div className="checkout-ready"><CheckCircle2 size={18} /><p>Data pendaftaran tersimpan. Keranjang siap dibayar melalui checkout Shopify.</p></div>}
            <button className="checkout-button" type="button" disabled={!saved || !selectedProduct || !cart || busy} onClick={proceedToCheckout}><CreditCard size={18} /> Lanjut ke checkout <ExternalLink size={14} /></button>
            <p className="checkout-panel__foot">Pembayaran diproses pada halaman checkout Shopify. Metode pembayaran muncul setelah toko diklaim dan provider pembayaran diaktifkan.</p>
          </aside>
        </section>
      </main>
    </div>
  );
}
