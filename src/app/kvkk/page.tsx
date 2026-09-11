import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import LegalPage, { LegalList, LegalSection } from "@/components/legal/LegalPage";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { LOCATIONS, PHONE } from "@/config/site";

/*
 * TASLAK: Metin yalnızca sitedeki doğrulanmış bilgilerle hazırlanmıştır;
 * yayına alınmadan önce hukuk danışmanının incelemesi gerekir.
 */

const base = buildPageMetadata(ROUTES.kvkk);

export const metadata: Metadata = {
  ...base,
  robots: { index: false, follow: true },
};

const UPDATED = "22 Ağustos 2026";

const KVKK_RIGHTS = [
  "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
  "İşlenmişse buna ilişkin bilgi talep etme,",
  "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
  "Yurt içinde aktarıldığı üçüncü kişileri bilme,",
  "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
  "İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde silinmesini veya yok edilmesini isteme,",
  "Münhasıran otomatik sistemler ile analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
  "Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
] as const;

export default function KvkkPage() {
  return (
    <>
      <JsonLd data={buildWebPageJsonLd(ROUTES.kvkk)} />
      <LegalPage
        title="KVKK Aydınlatma Metni"
        lead="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, Özdemir Mühendislik olarak veri sorumlusu sıfatıyla kişisel verilerinizi nasıl işlediğimiz konusunda sizi bu metinle aydınlatıyoruz."
        updated={UPDATED}
      >
      <LegalSection title="1. Veri Sorumlusunun Kimliği">
        <p>
          Kişisel verileriniz, veri sorumlusu Özdemir Mühendislik tarafından aşağıdaki
          adreslerde ve iletişim kanalı üzerinden işlenir:
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

      <LegalSection title="2. İşlenen Kişisel Veri Kategorileri">
        <LegalList
          items={[
            "Kimlik bilgileri: ad, soyad,",
            "İletişim bilgileri: telefon numarası ve paylaştığınız diğer iletişim bilgileri,",
            "Lokasyon bilgileri: keşif yapılacak ev veya tesise ait il/ilçe ve adres bilgileri,",
            "Müşteri işlem bilgileri: keşif, teklif, satış, montaj ve servis süreçlerine ilişkin kayıtlar.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Kişisel Verilerin İşlenme Amaçları">
        <p>Kişisel verileriniz şu amaçlarla işlenir:</p>
        <LegalList
          items={[
            "Ücretsiz keşif randevusunun planlanması ve yerinde değerlendirme yapılması,",
            "Eve veya tesise özel sistem seçiminin, teklifin ve fiyatlandırmanın hazırlanması,",
            "Satış, montaj, devreye alma, bakım ve servis sözleşmelerinin kurulması ve ifası,",
            "Talep ve şikâyetlerin takibi ile iletişim süreçlerinin yürütülmesi,",
            "Faturalandırma ve mevzuattan doğan yükümlülüklerin yerine getirilmesi,",
            "Web sitesi kullanımının ölçülmesi, reklam performansının ve dönüşümlerin takibi ile pazarlama faaliyetlerinin yürütülmesi.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. İşlemenin Hukuki Sebepleri">
        <p>
          Kişisel veriler, KVKK&apos;nın 5. maddesinin ikinci fıkrasında sayılan hukuki
          sebeplere dayanılarak işlenir: bir sözleşmenin kurulması veya ifasıyla doğrudan
          doğruya ilgili olması kaydıyla sözleşmenin taraflarına ait kişisel verilerin
          işlenmesinin gerekli olması (m. 5/2-c), veri sorumlusunun hukuki yükümlülüğünü
          yerine getirebilmesi için zorunlu olması (m. 5/2-ç) ve ilgili kişinin temel
          hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru
          menfaatleri için veri işlenmesinin zorunlu olması (m. 5/2-f). Gereken
          hâllerde açık rızanıza (m. 5/1) başvurulur.
        </p>
      </LegalSection>

      <LegalSection title="5. Kişisel Verilerin Aktarılması">
        <p>
          Kişisel veriler; KVKK&apos;nın 8. maddesindeki şartlar çerçevesinde, yasal
          yükümlülüklerin yerine getirilmesi amacıyla kanunen yetkili kamu kurum ve
          kuruluşlarına ve işleme amaçlarıyla sınırlı olarak hizmet aldığımız
          sağlayıcılara (barındırma ve altyapı hizmetleri gibi) aktarılabilir.
        </p>
        <p>
          Ayrıca web sitesi kullanımının ölçülmesi ve reklam performansının takibi
          amacıyla, çerezler aracılığıyla toplanan veriler yurt dışında yerleşik
          hizmet sağlayıcılara aktarılır: Google Ireland Ltd. / Google LLC (Google
          Analytics, Google Ads), Meta Platforms Ireland Ltd. (Meta Pixel) ve
          Microsoft Corporation (Clarity). Bu aktarımın kapsamı ve hukuki dayanağı
          Gizlilik Politikası&apos;nda ayrıca açıklanır.
        </p>
        <p>
          Bunun dışında kişisel veriler üçüncü kişilere aktarılmaz, satılmaz veya
          kiralanmaz.
        </p>
      </LegalSection>

      <LegalSection title="6. Toplanma Yöntemi">
        <p>
          Kişisel verileriniz; telefon ve WhatsApp gibi iletişim kanalları üzerinden
          sözlü veya yazılı olarak, web sitemizdeki talep formu aracılığıyla, keşif ve
          hizmet süreçlerinde yerinde ve kısmen otomatik yollarla toplanır.
        </p>
        <p>
          Sitedeki talep formu verilerinizi bu siteye kaydetmez; girdiğiniz bilgilerle
          bir WhatsApp mesaj taslağı hazırlanır ve gönderme kararı size aittir. Ayrıca
          site kullanımınıza ilişkin veriler çerezler aracılığıyla otomatik yollarla
          toplanır.
        </p>
      </LegalSection>

      <LegalSection title="7. KVKK&apos;nın 11. Maddesi Kapsamındaki Haklarınız">
        <p>Kişisel verilerinize ilişkin olarak şu haklara sahipsiniz:</p>
        <LegalList items={KVKK_RIGHTS} />
      </LegalSection>

      <LegalSection title="8. Başvuru Yöntemi">
        <p>
          KVKK&apos;nın 11. maddesindeki haklarınıza ilişkin taleplerinizi, yazılı olarak
          &ldquo;{LOCATIONS[0].streetAddress}, {LOCATIONS[0].postalCode}{" "}
          {LOCATIONS[0].addressLocality}/{LOCATIONS[0].addressRegion}&rdquo; adresimize
          iletebilir veya {PHONE} numarasından bize ulaşarak yönlendirme alabilirsiniz.
          Başvurular, talebin niteliğine göre en geç 30 gün içinde ücretsiz olarak
          sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel
          Verileri Koruma Kurulu&apos;nca belirlenen tarifedeki ücret alınabilir.
        </p>
      </LegalSection>

      <LegalSection title="9. Güncellemeler">
        <p>
          Bu aydınlatma metni {UPDATED} tarihinde güncellenmiştir. Mevzuat veya veri
          işleme süreçlerimizdeki değişikliklere bağlı olarak güncellenebilir; güncel
          sürüm her zaman bu sayfada yayımlanır.
        </p>
      </LegalSection>
      </LegalPage>
    </>
  );
}
