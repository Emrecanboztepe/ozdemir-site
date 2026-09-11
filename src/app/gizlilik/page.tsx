import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { LOCATIONS, PHONE } from "@/config/site";

/*
 * TASLAK: Metin yalnızca sitedeki doğrulanmış bilgilerle hazırlanmıştır;
 * yayına alınmadan önce hukuk danışmanının incelemesi gerekir.
 */

const base = buildPageMetadata(ROUTES.gizlilik);

export const metadata: Metadata = {
  ...base,
  robots: { index: false, follow: true },
};

const UPDATED = "22 Ağustos 2026";

export default function GizlilikPage() {
  return (
    <>
      <JsonLd data={buildWebPageJsonLd(ROUTES.gizlilik)} />
      <LegalPage
        title="Gizlilik Politikası"
        lead="Özdemir Mühendislik olarak, ozdemirmuhendislik.net adresini ziyaret eden ve bizimle iletişime geçen herkesin gizliliğini ciddiye alıyoruz. Bu politika; hangi bilgileri, hangi amaçlarla ve nasıl işlediğimizi özetler."
        updated={UPDATED}
      >
      <LegalSection title="1. Veri Sorumlusu">
        <p>
          Kişisel verileriniz, veri sorumlusu sıfatıyla Özdemir Mühendislik tarafından
          işlenir. Bize aşağıdaki adres ve telefonlardan ulaşabilirsiniz:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {LOCATIONS.map((location) => (
            <li key={location.name}>
              {location.name}: {location.streetAddress},{" "}
              {location.postalCode} {location.addressLocality}/{location.addressRegion}
            </li>
          ))}
          <li>Telefon: {PHONE}</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Toplanan Bilgiler ve Toplanma Yöntemleri">
        <p>
          Ücretsiz keşif, teklif veya servis talebiyle bize telefon ya da WhatsApp
          üzerinden ulaştığınızda paylaştığınız bilgiler kayda alınır: adınız, iletişim
          bilgileriniz ve talebinize konu eve veya tesise ait bilgiler (il/ilçe, adres,
          yapının büyüklüğü ve mevcut ısıtma sistemi gibi).
        </p>
        <p>
          Sitemizde ziyaret ve reklam ölçümü amacıyla çerez kullanılır. Google Tag
          Manager üzerinden çalışan araçlar şunlardır: Google Analytics 4 (site
          kullanım istatistiği), Google Ads (reklam dönüşüm ölçümü), Meta Pixel
          (Facebook/Instagram reklam ölçümü) ve Microsoft Clarity (sayfa içi
          davranış kaydı). Bu araçlar tarayıcınıza <code>_ga</code>,{" "}
          <code>_ga_*</code>, <code>_gcl_au</code>, <code>_clck</code> ve{" "}
          <code>_clsk</code> gibi çerezler yazabilir.
        </p>
        <p>
          Bu araçlar site kullanımınıza ilişkin verileri kendi sunucularına aktarır;
          sağlayıcılar yurt dışında bulunmaktadır. Sayfalara gömülü üçüncü taraf
          içerikleri (örneğin Instagram videoları) da kendi gizlilik politikaları
          kapsamında kendi çerezlerini kullanabilir.
        </p>
      </LegalSection>

      <LegalSection title="3. İşleme Amaçları">
        <p>Paylaşılan bilgiler yalnızca şu amaçlarla kullanılır:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Keşif randevusu planlamak ve taleplerinize geri dönüş yapmak,</li>
          <li>Eve veya tesise özel sistem seçimini ve teklifi hazırlamak,</li>
          <li>Satış, montaj, devreye alma ve servis süreçlerini yürütmek,</li>
          <li>Faturalandırma başta olmak üzere yasal yükümlülükleri yerine getirmek.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Hukuki Sebep">
        <p>
          Kişisel veriler, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun
          (KVKK) 5. maddesinde sayılan hukuki sebeplere dayanılarak işlenir: bir
          sözleşmenin kurulması veya ifasıyla doğrudan ilgisi olması, hukuki
          yükümlülüklerimizin yerine getirilmesi, meşru menfaatlerimiz için veri
          işlemenin zorunlu olması ve gerektiğinde açık rızanız.
        </p>
      </LegalSection>

      <LegalSection title="5. Bilgilerin Aktarılması">
        <p>
          Kişisel bilgilerinizi satmayız ve kiralamayız. Bilgiler yalnızca; yasal
          zorunluluklar kapsamında kanunen yetkili kurum ve kuruluşlara ve işlediğimiz
          amaçla sınırlı olarak hizmet aldığımız sağlayıcılara (barındırma ve altyapı
          hizmetleri gibi) aktarılabilir.
        </p>
      </LegalSection>

      <LegalSection title="6. Saklama Süresi">
        <p>
          Kişisel veriler, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta
          öngörülen zamanaşımı süreleri dolana kadar saklanır; süre sonunda silinir,
          yok edilir veya anonim hâle getirilir.
        </p>
      </LegalSection>

      <LegalSection title="7. Güvenlik">
        <p>
          Bilgilerinize yetkisiz erişimi, kaybı ve kötüye kullanımı önlemek için makul
          teknik ve idari tedbirleri uygularız; bilgilere yalnızca işin gereği
          yetkili kişiler erişir.
        </p>
      </LegalSection>

      <LegalSection title="8. Haklarınız ve Başvuru">
        <p>
          KVKK kapsamındaki haklarınız ve başvuru yöntemi hakkında ayrıntılı bilgiye{" "}
          <a href={ROUTES.kvkk.href} className="font-medium text-brand-blue transition-colors hover:text-brand-teal">
            KVKK Aydınlatma Metni
          </a>{" "}
          sayfasından ulaşabilirsiniz. Sorularınız için {PHONE} numarasından bizi
          arayabilir veya yukarıdaki adreslerimize yazılı başvurabilirsiniz.
        </p>
      </LegalSection>

      <LegalSection title="9. Değişiklikler">
        <p>
          Bu politika gerektiğinde güncellenebilir; güncel sürüm her zaman bu sayfada
          yayımlanır. Son güncelleme tarihi: {UPDATED}.
        </p>
      </LegalSection>
      </LegalPage>
    </>
  );
}
