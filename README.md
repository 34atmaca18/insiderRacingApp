<h1>Live on Netlify</h1>
<p>https://aydoganhorseracing.netlify.app</p>

<h1>Uygulama nasıl çalışıyor?</h1>
<p>İlk açıldığında yarış pisti boş olarak karşımıza çıkıyor. Generate program butonuna tıkladığımızda ise 6 tur için içerisinde 20 tane at olan listeden her tur için rastgele şekilde 10 tane at seçiliyor. Her tur bittiğinde atların bitiş çizgisine ulaşma sırasına göre results kısmında her tur için atların sıralamasını görüyoruz. Start/stop butonu ise atlar hareket halindeyken basıldığında atların olduğu yerde durmasını, dururken basılır ise olduğu yerden devam etmesini sağlıyor. Atların hızları her 1200ms'de bir eksi ya da artı olacak şekilde ivmeleniyor. Aynı zamanda atların kondisyonu da bu ivmelenmeyi dolayısıyla atların hızını etkliyor.</p>

<h1>Projedeki Eksilerim ve Artılarım</h1>
<p>Artılar: Bütün fonksiyonların eksiksiz olarak çalıştığını, vue-cli ekstra olarak atların anlık hızlarının m/s cinsinden gözüktüğünü ve bu hızın pistin uzunluğuna bağlı olarak gerçek süreyle eş zamanlı olarak bitmesini söyleyebiliriz.Örneğin 50m/s hızı varsa 1200m pisti 24 saniyede bitiricek, turların uzun sürmemesi için atların hızları 100-150m/s arasında başlayıp ivmelenmeleri dahilinde artıp azalabilecek şekilde ayarladım.
<br/>
Eksilerim: İlk vue-cli,vuex tecrübem olduğundan dolayı, istenilen component kullanımı ne kadar sağlansa da, vuex store kullanımında eksiklik yaşamış olabilirim. Mobil tarafında ise zoom out yaparak ordan da rahatlıkla uygulama deneyimlenebilir yine de bilgisayar ortamındaki kadar rahat bir deneyim sağlayamayacağını düşünüyorum. <br/>
</p>
