// Dizi Bölümü

class Urun { // Ürünlerin tanımı
    constructor(name, stock, buyPrice, sellPrice) {
        this.name = name;  // Ürün adını tutacak değişken
        this.stock = stock; // Ürün stok miktarını tutacak değişken
        this.buyPrice = buyPrice; // Ürün alış fiyatını tutacak değişken (maliyet)
        this.sellPrice = sellPrice; // Ürün satış fiyatını tutacak değişken
    }
}

class SepetUrun { // Sepetteki ürünleri tutacak nesne
    constructor(urun, adet) { // Ürün ve adet bilgilerini tutacak nesne
        this.urun = urun; // Ürün bilgisini tutacak değişken
        this.adet = adet; // Adet bilgisini tutacak değişken
    }

    artirAdet(adet) { // Sepetteki ürünün adetini artıran fonksiyon

        this.adet += adet; // Sepetteki ürünün adetini güncelle (Adet = Adet + Adet)
    }

    get toplamFiyat() { // Sepetteki ürünün toplam fiyatını hesaplayan fonksiyon

        return this.urun.sellPrice * this.adet; // Ürünün satış fiyatını adeti ile çarp ve sonucu döndür
    }
}


var urunler = [ // Market ürünlerini tutacak dizi (Market ürünleri tedarikçiden alıyor)
    new Urun("Elma", 0, 10, 15), // Ürün adı, stok miktarı, alış fiyatı ve satış fiyatı bilgilerini tutacak nesne
    new Urun("Armut", 0, 9, 13),
    new Urun("Pırasa", 0, 5, 8),
    new Urun("Ispanak", 0, 14, 23),
    new Urun("Karpuz", 0, 13, 50),
];

var tedarikci = [ // Tedarikçi ürünlerini tutacak dizi (Tedarikçi ürünleri markete satıyor)
    new Urun("Elma", 9999, 10, 15), // Ürün adı, stok miktarı, alış fiyatı ve satış fiyatı bilgilerini tutacak nesne
    new Urun("Armut", 9999, 9, 13),
    new Urun("Pırasa", 9999, 5, 8),
    new Urun("Ispanak", 9999, 9, 23),
    new Urun("Karpuz", 9999, 17, 50),

];

var sepet = []; // Sepeti tutacak dizi

var alisSepeti = []; // Alış sepetini tutacak dizi



var toplamCiro = 250; // Toplam ciroyu tutacak değişkeni tanımla ve başlangıçta 250 TL olarak ata

var toplamMaliyet = 0; // Toplam maliyeti tutacak değişkeni tanımla

var satilanUrunler = []; // Satılan ürünleri tutacak dizi


// Fonksiyon Bölümü

// Ürünleri isimlerine göre bulan fonksiyon parametre olarak şunları alır : Ürünler dizisi ve ürün adı
function getUrunByName(source, name) { 

    return source.find(u => u.name === name); // Ürünler dizisindeki her bir ürün için aşağıdaki işlemleri yap
}

// Satılan ürünleri satilanUrunler dizisine ekleyen fonksiyon
function satilanUrunEkle(urun, adet) { 
    var satilan = satilanUrunler.find(su => su.name === urun.name); // Satılan ürünler dizisinde seçili ürün var mı diye kontrol et
    if (satilan) { // Eğer seçili ürün satilanUrunler dizisinde varsa

        satilan.stock += adet; // Satılan ürünün stok miktarını güncelle (Stok = Stok + Adet)

    } else {    // Eğer seçili ürün satilanUrunler dizisinde yoksa

        satilanUrunler.push({ name: urun.name, buyPrice: urun.buyPrice, sellPrice: urun.sellPrice, stock: adet }); // Satılan ürünleri satilanUrunler dizisine ekle
    }
}

// Toplam karı hesaplayan fonksiyon
function hesaplaToplamKar() { 

    var toplamKar = 0; // Toplam karı tutacak değişkeni tanımla

    satilanUrunler.forEach(urun => { // Satılan ürünler dizisindeki her bir ürün için aşağıdaki işlemleri yap
        toplamKar += urun.stock * (urun.sellPrice - urun.buyPrice); // Toplam karı güncelle (Toplam kar = Toplam kar + (Satılan ürünün adedi * (Satış fiyatı - Alış fiyatı)))
    });
    return toplamKar; // Toplam karı döndür
}

function guncelleCiroKar() {
    var bakiyeElement = document.getElementById("ciro"); // Bakiyeyi seç
    var karElement = document.getElementById("kar"); // Karı seç
    bakiyeElement.textContent = `${toplamCiro} ₺`; // Toplam ciroyu ekrana yaz
    karElement.textContent = `${hesaplaToplamKar()} ₺`; // Toplam karı ekrana yaz
}

// Ürün listesini güncelleme fonksiyonu
function guncelleUrunListesi() { 

    var urunListesi = document.getElementById("urunListesi"); // Ürün listesini seç

    urunListesi.innerHTML = "";  // Önceki seçenekleri temizle

    urunler.forEach(function (urun) { // Ürünler dizisindeki her bir ürün için aşağıdaki işlemleri yap

        var option = document.createElement("option"); // Yeni bir seçenek oluştur yani <option></option>

        option.value = urun.name;  // Her bir ürünün adını seçenek değeri olarak atadık

        option.textContent = `${urun.name} - Stok: ${urun.stock} - Satış Fiyatı: ${urun.sellPrice} ₺`; 
        // Seçeneğin üzerine ürünün adını, stok miktarını ve satış fiyatını yazdık 
        // (<option value="urun.name"> ${urun.name} - Stok: ${urun.stock} - Satış Fiyatı: ${urun.sellPrice} ₺</option>)

        urunListesi.appendChild(option); // Seçeneği ürün listesine ekle
    });
}

 // Sepet tablosunu güncelleme ve toplam tutarı hesaplama fonksiyonu
function guncelleSepet() {

    var sepetTablosu = document.getElementById("sepetTablosu"); // Sepet tablosunu seç
    sepetTablosu.innerHTML = ""; // Önceki sepeti temizle 

    var toplamTutar = 0; // Sepetteki ürünlerin toplam tutarını hesaplamak için kullanacağız

    sepet.forEach((sepetUrun, index) => { // Sepetteki her bir ürün için aşağıdaki işlemleri yap

        var urun = sepetUrun.urun;  // Sepetteki ürünün bilgilerini al

        var tr = document.createElement("tr"); // Yeni bir satır oluştur

        ["name", "adet"].forEach(field => { // Ürünün adı ve adet bilgilerini tabloya ekle

            var td = document.createElement("td"); // Yeni bir hücre oluştur

            td.textContent = sepetUrun[field] || urun[field]; // Hücreye ürünün adı ve adet bilgisini yaz

            tr.appendChild(td); // Hücreyi satıra ekle
        });

        var tdBirimFiyat = document.createElement("td"); // Yeni bir hücre oluştur

        tdBirimFiyat.textContent = `${urun.sellPrice} ₺`; // Hücreye ürünün birim fiyatını yaz

        tr.appendChild(tdBirimFiyat); // Hücreyi satıra ekle

        var tdToplamFiyat = document.createElement("td"); // Yeni bir hücre oluştur

        var toplamFiyat = urun.sellPrice * sepetUrun.adet; // Ürünün toplam fiyatını hesapla

        tdToplamFiyat.textContent = `${toplamFiyat} ₺`; // Hücreye ürünün toplam fiyatını yaz

        tr.appendChild(tdToplamFiyat); // Hücreyi satıra ekle

        var tdSil = document.createElement("td"); // Yeni bir hücre oluştur

        var silButton = document.createElement("button"); // Yeni bir buton oluştur

        silButton.textContent = "Sil"; // Butonun üzerine "Sil" yaz

        silButton.className = "btn-s-pink"; // Butona bootstrap'ten gelen "btn" ve "btn-danger" classlarını ekle

        silButton.onclick = () => sepettenSil(index); // Butona tıklandığında sepettenSil fonksiyonunu çalıştır

        tdSil.appendChild(silButton); // Butonu hücreye ekle

        tr.appendChild(tdSil); // Hücreyi satıra ekle

        sepetTablosu.appendChild(tr); // Satırı tabloya ekle

        toplamTutar += toplamFiyat; // Sepetteki ürünün toplam fiyatını toplam tutara ekle
    });

    document.getElementById("toplamTutar").textContent = `${toplamTutar} ₺`; // Toplam tutarı ekrana yaz
}

// Sepetten ürün silme fonksiyonu
function sepettenSil(index) { 

    sepet.splice(index, 1);  // Sepetten belirtilen indexteki 1 ürünü sil

    guncelleSepet(); // Sepeti güncelle
}

// Sepete ürün ekleme fonksiyonu
function sepeteEkle() {

    const urunListesi = document.getElementById("urunListesi"); // Ürün listesini seç

    const adetInput = document.getElementById("adet"); // Adet inputunu seç

    const urunAdi = urunListesi.value; // Ürün listesinde seçili olan ürünün adını al

    const adet = parseInt(adetInput.value); // Adet inputundaki değeri al ve integer'a çevir (sayıya çevir)

    const secilenUrun = urunler.find(u => u.name === urunAdi); // Ürün listesinde seçili olan ürünün bilgilerini al (find fonksiyonu kullanarak) 

    if (!secilenUrun) {  // Eğer seçili ürün bulunamadıysa

        alert("Ürün bulunamadı."); // Kullanıcıya uyarı mesajı göster

        return; // Fonksiyondan çık
    }

    if (secilenUrun.stock < adet) { // Eğer seçili üründen seçili adette stokta yoksa

        alert("Stokta yeterli ürün bulunmamaktadır."); // Kullanıcıya uyarı mesajı göster
        return; // Fonksiyondan çık
    }

    let sepetUrun = sepet.find(su => su.urun.name === urunAdi); // Sepette seçili ürün var mı diye kontrol et

    if (sepetUrun) { // Eğer sepete eklenen ürün sepette varsa

        sepetUrun.artirAdet(adet); // Sepetteki ürünün adetini artır

    } else {  // Eğer sepete eklenen ürün sepette yoksa

        sepetUrun = new SepetUrun(secilenUrun, adet); // Yeni bir sepet ürünü oluştur

        sepet.push(sepetUrun); // Sepete yeni ürünü ekle
    }

    guncelleSepet(); // Sepeti güncelle

    guncelleUrunListesi(); // Ürün listesini güncelle

    adetInput.value = 1; // Adet inputunun değerini 1 yap
}

// Satın alma fonksiyonu
function satinAl() { 

    var sepetToplamTutar = 0;  // Sepetteki ürünlerin toplam tutarını hesaplamak için kullanacağız

    sepet.forEach(sepetUrun => { // Sepetteki her bir ürün için aşağıdaki işlemleri yap

        var urun = sepetUrun.urun; // Sepetteki ürünün bilgilerini al

        if (urun.stock < sepetUrun.adet) { // Eğer sepete eklenen üründen seçili adette stokta yoksa

            alert(`${urun.name} için yetersiz stok. Satın alma işlemi gerçekleştirilemedi.`); // Kullanıcıya uyarı mesajı göster

            return; // Fonksiyondan çık
        }

        let toplamFiyat = urun.sellPrice * sepetUrun.adet; // Ürünün toplam fiyatını hesapla

        sepetToplamTutar += toplamFiyat; // Sepetteki ürünün toplam fiyatını toplam tutara ekle

        urun.stock -= sepetUrun.adet; // Ürünün stok miktarını azalt

        satilanUrunEkle(urun, sepetUrun.adet);  // Satılan ürünü satilanUrunler dizisine ekliyoruz

        toplamMaliyet += urun.buyPrice * sepetUrun.adet; // Toplam maliyeti güncelle
    });

    toplamCiro += sepetToplamTutar; // Toplam ciroyu güncelle

    if (sepetToplamTutar > 0) { // Eğer sepet tutarı 0'dan büyükse

        alert(`Satın alma başarılı! Toplam Tutar: ${sepetToplamTutar} ₺`); // Kullanıcıya satın alma başarılı mesajı göster

        sepet = []; // Sepeti boşalt

    } else { // Eğer sepet tutarı 0'dan büyük değilse

        alert("Sepetinizde ürün bulunmamaktadır.");  // Kullanıcıya sepet boş mesajı göster
    }

    guncelleSepet(); // Sepeti güncelle

    guncelleUrunListesi(); // Ürün listesini güncelle

    guncelleCiroKar(); // Ciro ve karı güncelle

    sermayeyiGuncelle(); // Sermayeyi (Ciroyu her yerde) güncelle
}

function sermayeyiGuncelle() { // Sermayeyi güncelleme fonksiyonu
    document.getElementById("mevcutSermaye").textContent = `${toplamCiro} ₺`; // Sermayeyi ekrana Ürün Alış ekranına yaz
}

function guncelleMarketUrunleri() { // Market ürünlerini güncelleme fonksiyonu

    var marketUrunTablosu = document.getElementById("marketUrunTablosu"); // Market ürünlerini seç

    marketUrunTablosu.innerHTML = ""; // Önceki ürünleri temizle

    urunler.forEach((urun, index) => { // Ürünler dizisindeki her bir ürün için aşağıdaki işlemleri yap

        var tr = document.createElement("tr");  // Yeni bir satır oluştur

        ["name", "stock", "buyPrice", "sellPrice"].forEach(field => { // Ürünün adı, stok miktarı, alış fiyatı ve satış fiyatı bilgilerini tabloya ekle

            var td = document.createElement("td"); // Yeni bir hücre oluştur

            td.textContent = `${urun[field]}${field.includes("Price") ? " ₺" : ""}`; // Hücreye ürünün adı, stok miktarı, alış fiyatı ve satış fiyatı bilgisini yaz

            tr.appendChild(td); // Hücreyi satıra ekle
        });

        marketUrunTablosu.appendChild(tr); // Satırı tabloya ekle

    });
}

function urunSil(index) { // Ürün silme fonksiyonu

    urunler.splice(index, 1); // urunler dizisinden belirtilen indexteki 1 ürünü sil

    guncelleMarketUrunleri(); // Market ürünlerini güncelle
}

// Alış listesini güncelleme fonksiyonu
function guncelleAlisListesi() { 

    var alisListesi = document.getElementById("alisYapilanUrun"); // Alış listesini seç

    alisListesi.innerHTML = ""; // Önceki seçenekleri temizle

    tedarikci.forEach(function (urun, index) { // Tedarikçi ürünlerindeki her bir ürün için aşağıdaki işlemleri yap

        var option = document.createElement("option"); // Yeni bir seçenek oluştur

        option.value = index; // Her bir ürünün indexini seçenek değeri (<option value="index"></option>) olarak atadık. Bu sayede seçeneklerden birine tıklandığında hangi ürünün seçildiğini bileceğiz (index'ini bileceğiz) 

        option.textContent = `${urun.name} - Stok: ${urun.stock}`; // Seçeneğin üzerine ürünün adını ve stok miktarını yazdık (<option value="index"> ${urun.name} - Stok: ${urun.stock}</option>)

        alisListesi.appendChild(option); // Seçeneği alış listesine ekle
    });
}

// Alış sepetini güncelleme fonksiyonu
function guncelleAlisSepeti() { 

    var alisSepetiTablosu = document.getElementById("alisSepetTablosu"); // Alış sepetini seç

    alisSepetiTablosu.innerHTML = ""; // Önceki sepeti temizle... Bunu yapmamızın nedeni alış sepetindeki ürünlerin güncel bilgilerini göstermek. Eğer göstermezsek hatayla karşılaşabiliriz.

    alisSepeti.forEach((alisUrun, index) => { // Alış sepetindeki her bir ürün için aşağıdaki işlemleri yap

        var urun = urunler[alisUrun.urunIndex]; // Alış sepetindeki ürünün bilgilerini al

        var tr = document.createElement("tr"); // Yeni bir satır oluştur

        ["name", "adet", "buyPrice"].forEach(field => { // Ürünün adı, adet ve alış fiyatı bilgilerini tabloya ekle

            var td = document.createElement("td"); // Yeni bir hücre oluştur

            td.textContent = alisUrun[field] || urun[field]; // Hücreye ürünün adı, adet ve alış fiyatı bilgisini yaz

            tr.appendChild(td); // Hücreyi satıra ekle
        });

        var tdToplamMaliyet = document.createElement("td"); // Yeni bir hücre oluştur

        tdToplamMaliyet.textContent = `${alisUrun.adet * urun.buyPrice} ₺`; // Hücreye ürünün toplam maliyetini yaz

        tr.appendChild(tdToplamMaliyet); // Hücreyi satıra ekle

        var tdSatinal = document.createElement("td"); // Yeni bir hücre oluştur

        var satinalButton = document.createElement("button"); // Yeni bir buton oluştur

        satinalButton.textContent = "Satın Al"; // Butonun üzerine "Satın Al" yaz yani <button>Satın Al</button> şeklinde olacak

        satinalButton.className = "btn-s-pink"; // Butona bootstrap'ten gelen "btn" , "btn-ou₺ine-success"  "btn-sm" classlarını ekle. Yani <button class="btn btn-ou₺ine-success btn-sm">Satın Al</button> şeklinde olacak

        satinalButton.onclick = () => alisiTamamlaTekUrun(index); // Butona tıklandığında alisiTamamlaTekUrun fonksiyonunu çalıştır

        tdSatinal.appendChild(satinalButton); // Butonu hücreye ekle

        tr.appendChild(tdSatinal); // Hücreyi satıra ekle

        var tdSil = document.createElement("td"); // Yeni bir hücre oluştur

        var silButton = document.createElement("button"); // Yeni bir buton oluştur

        silButton.textContent = "Sil"; // Butonun üzerine "Sil" yaz yani <button>Sil</button> şeklinde olacak

        silButton.className = "btn-s-pink"; // Butona bootstrap'ten gelen "btn" ve "btn-danger" classlarını ekle. Yani <button class="btn btn-danger btn-sm">Sil</button> şeklinde olacak

        silButton.onclick = () => alisSepetindenSil(index); // Butona tıklandığında alisSepetindenSil fonksiyonunu çalıştır 

        tdSil.appendChild(silButton); // Butonu hücreye ekle

        tr.appendChild(tdSil); // Hücreyi satıra ekle

        alisSepetiTablosu.appendChild(tr); // Satırı tabloya ekle
    });
}

// Tedarikçi ürünlerini güncelleme fonksiyonu
function guncelleTedarikciUrunleri() { 

    var tedarikciUrunTablosu = document.getElementById("tedarikciUrunTablosu"); // Tedarikçi ürünlerini seç

    tedarikciUrunTablosu.innerHTML = ""; // Önceki ürünleri temizle

    tedarikci.forEach((urun, index) => { // Tedarikçi ürünlerindeki her bir ürün için aşağıdaki işlemleri yap

        var tr = document.createElement("tr"); // Yeni bir satır oluştur

        ["name", "stock", "buyPrice"].forEach(field => { // Ürünün adı, stok miktarı ve alış fiyatı bilgilerini tabloya ekle

            var td = document.createElement("td"); // Yeni bir hücre oluştur 

            td.textContent = `${urun[field]}${field.includes("Price") ? " ₺" : ""}`; // Hücreye ürünün adı, stok miktarı ve alış fiyatı bilgisini yaz 

            tr.appendChild(td); // Hücreyi satıra ekle
        });

        tedarikciUrunTablosu.appendChild(tr); // Satırı tabloya ekle
    });
}

// Alış sepetinden ürün silme fonksiyonu
function alisSepetindenSil(index) { 

    alisSepeti.splice(index, 1); // Alış sepetinden belirtilen indexteki 1 ürünü sil

    guncelleAlisSepeti(); // Alış sepetini güncelle
}

// Alış yapma fonksiyonu
function aliseEkle() { 

    var alisListesi = document.getElementById("alisYapilanUrun"); // Alış listesini seç. Bunu şunu çağırmak şekilde yapar : <select id="alisYapilanUrun"></select>



    var adetInput = document.getElementById("alisAdet"); // Adet inputunu seç. Bunu da şunu çağırma şeklinde yapar: <input type="number" id="alisAdet" class="form-control" min="1" value="1">

    var urunIndex = alisListesi.value; // Alış listesinde seçili olan ürünün indexini al. Bunu da şu şekilde yapar: <select id="alisYapilanUrun"><option value="index"></option></select>

    var adet = parseInt(adetInput.value); // Adet inputundaki değeri al ve integer'a çevir (sayıya çevir)

    if (adet <= 0) { // Eğer adet 0'dan küçükse

        alert("Lütfen geçerli bir adet girin."); // Kullanıcıya uyarı mesajı göster
        return;
    }

    var alisUrunIndex = alisSepeti.findIndex(item => item.urunIndex == urunIndex); // Alış sepetinde seçili ürün var mı diye kontrol et

    if (alisUrunIndex !== -1) { // Eğer alış sepetinde seçili ürün varsa

        alisSepeti[alisUrunIndex].adet += adet; // Alış sepetindeki ürünün adetini artır

    } else { // Eğer alış sepetinde seçili ürün yoksa

        alisSepeti.push({ urunIndex: parseInt(urunIndex), adet: adet, name: urunler[urunIndex].name }); // Alış sepetine yeni ürünü ekle
    }

    guncelleAlisSepeti(); // Alış sepetini güncelle

    guncelleTedarikciUrunleri(); // Tedarikçi ürünlerini güncelle

    adetInput.value = 1; // Adet inputunun değerini 1 yap. Sayfa açıldığında default olarak 1 yazıyor zaten
}

// Alışı tamamlama fonksiyonu
function alisiTamamla() { 

    alisSepeti.forEach(alisUrun => { // Alış sepetindeki her bir ürün için aşağıdaki işlemleri yap. Bunu şunu çağırmak şeklinde yapar : <tbody id="alisSepetTablosu"><tr><td></td></tr></tbody>

        var urun = urunler[alisUrun.urunIndex]; // Alış sepetindeki ürünün bilgilerini al

        urun.stock += alisUrun.adet;  // Ürünün stok miktarını artır
    });

    alert(`Ürün alışı başarılı!`); // Kullanıcıya ürün alışı başarılı mesajı göster
    alisSepeti = []; // Alış sepetini boşalt

    guncelleAlisSepeti(); // Alış sepetini güncelle

    guncelleMarketUrunleri(); // Market ürünlerini güncelle

    guncelleAlisListesi(); // Alış listesini güncelle
}

// Alış sepetindeki toplam maliyeti hesaplama fonksiyonu
function alisSepetindekiToplamMaliyetiHesapla() { 

    let toplamMaliyet = 0; // Toplam maliyeti tutmak için bir değişken oluşturduk

    alisSepeti.forEach(alisUrun => { // Alış sepetindeki her bir ürün için aşağıdaki işlemleri yap

        var tedarikUrun = tedarikci[alisUrun.urunIndex]; // Alış sepetindeki ürünün bilgilerini al

        toplamMaliyet += tedarikUrun.buyPrice * alisUrun.adet; // Toplam maliyeti güncelle
    });
    return toplamMaliyet; // Toplam maliyeti döndür
}

// Alışı tamamlama fonksiyonu
function alisiTamamlaTekUrun(index) { 

    var alisUrun = alisSepeti[index]; // Alış sepetindeki ürünü al

    var tedarikUrun = tedarikci[alisUrun.urunIndex]; // Tedarikçi ürünlerinden alış sepetindeki ürünün indexine göre ürünü al. Yani alış sepetindeki ürünün bilgilerini al. 

    // Toplam alış maliyetini hesapla
    var toplamMaliyet = alisUrun.adet * tedarikUrun.buyPrice;

    // Eğer toplam maliyet ciroyu aşıyorsa, işlemi durdur ve uyarı mesajı göster
    if (toplamMaliyet > toplamCiro) {
        alert("Yetersiz bakiye! Lütfen alış miktarınızı kontrol edin.");
        return;
    }

    // Ciroyu düşür
    toplamCiro -= toplamMaliyet;

    var marketUrunu = urunler.find(urun => urun.name === tedarikUrun.name); // Market ürünlerinde alış sepetindeki ürünün adına göre ürünü bul

    if (!marketUrunu) { // Eğer market ürünlerinde alış sepetindeki ürünün adına göre ürün bulunamadıysa

        marketUrunu = { // Yeni bir market ürünü oluştur
            name: tedarikUrun.name, // Ürünün adı
            stock: 0, // Ürünün stok miktarı
            buyPrice: tedarikUrun.buyPrice, // Ürünün alış fiyatı
            sellPrice: tedarikUrun.sellPrice // Ürünün satış fiyatı
        };
        urunler.push(marketUrunu); // Market ürünlerine yeni ürünü ekle
    }

    // Tedarikçi stokunu düşür
    if (tedarikUrun.stock < alisUrun.adet) { // Eğer tedarikçi stokta yeterli ürün yoksa

        alert("Tedarikçide yeterli ürün bulunmamaktadır."); // Kullanıcıya uyarı mesajı göster
        return;
    }
    tedarikUrun.stock -= alisUrun.adet; // Tedarikçi stokunu düşür

    marketUrunu.stock += alisUrun.adet; // Market ürününün stokunu artır

    alisSepeti.splice(index, 1);  // Alınan ürünü alış sepetinden kaldır

    guncelleAlisSepeti(); // Alış sepetini güncelle
    guncelleMarketUrunleri();   // Market ürünlerini güncelle
    guncelleAlisListesi(); // Alış listesini güncelle
    guncelleTedarikciUrunleri(); // Tedarikçi ürünlerini güncelle
    sermayeyiGuncelle(); // Sermayeyi güncelle
    guncelleCiroKar(); // Ciro ve karı güncelle

}


// Event Listeners

document.getElementById("urunSatisButton").addEventListener("click", () => { // Bu kısımda gerçekleşen olay, ürün satış butonuna basıldığında çalışacak. Yani şu çağırıldığında : <button id="urunSatisButton" class="btn btn-outline-success btn-sm">Ürün Satış</button>

    document.getElementById("urunSatisForm").style.display = "block"; // Ürün satış formunu göster. Bunu şu şekilde çağırıyoruz : <form id="urunSatisForm"></form>

    document.getElementById("marketUrunleri").style.display = "none"; // Market ürünlerini gizle. Bunu şu şekilde çağırıyoruz : <div id="marketUrunleri"></div>

    document.getElementById("urunAlisForm").style.display = "none"; // Ürün alış formunu gizle. Bunu şu şekilde çağırıyoruz : <form id="urunAlisForm"></form>

    guncelleUrunListesi(); // Ürün listesini güncelle

    guncelleSepet(); // Sepeti güncelle
});


document.getElementById("urunSatisButton2").addEventListener("click", () => { // Bu kısımda gerçekleşen olay, ürün satış butonuna basıldığında çalışacak. Yani şu çağırıldığında : <button id="urunSatisButton" class="btn btn-outline-success btn-sm">Ürün Satış</button>

    document.getElementById("urunSatisForm").style.display = "block"; // Ürün satış formunu göster. Bunu şu şekilde çağırıyoruz : <form id="urunSatisForm"></form>

    document.getElementById("marketUrunleri").style.display = "none"; // Market ürünlerini gizle. Bunu şu şekilde çağırıyoruz : <div id="marketUrunleri"></div>

    document.getElementById("urunAlisForm").style.display = "none"; // Ürün alış formunu gizle. Bunu şu şekilde çağırıyoruz : <form id="urunAlisForm"></form>

    guncelleUrunListesi(); // Ürün listesini güncelle

    guncelleSepet(); // Sepeti güncelle
});


document.getElementById("sepeteEkleButton").addEventListener("click", sepeteEkle); // Bu kısımda gerçekleşen olay, sepete ekle butonuna basıldığında çalışacak. Yani şu çağırıldığında : <button id="sepeteEkleButton" class="btn btn-outline-success btn-sm">Sepete Ekle</button>

document.getElementById("satinalButton").addEventListener("click", satinAl); // Bu kısımda gerçekleşen olay, satın al butonuna basıldığında çalışacak. Yani şu çağırıldığında : <button id="satinalButton" class="btn btn-outline-success btn-sm">Satın Al</button>


// Bu kısımda gerçekleşen olay, market ürünlerini göster butonuna basıldığında çalışacak 
document.getElementById("marketUrunleriButton").addEventListener("click", () => { // Yani şu çağırıldığında : <button id="marketUrunleriButton" class="btn btn-outline-success btn-sm">Market Ürünleri</button>

    adminKontrolVeGoster("marketUrunleri");
    guncelleMarketUrunleri(); // Market ürünlerini güncelle
});


document.getElementById("marketUrunleriButton2").addEventListener("click", () => { // Yani şu çağırıldığında : <button id="marketUrunleriButton" class="btn btn-outline-success btn-sm">Market Ürünleri</button>

    adminKontrolVeGoster("marketUrunleri");
    guncelleMarketUrunleri(); // Market ürünlerini güncelle
});


document.getElementById("urunAlisButton").addEventListener("click", () => { // Bu kısımda gerçekleşen olay, ürün alış butonuna basıldığında çalışacak. Yani şu çağırıldığında : <button id="urunAlisButton" class="btn btn-outline-success btn-sm">Ürün Alış</button>

    adminKontrolVeGoster("urunAlisForm");
    
    guncelleTedarikciUrunleri(); // Tedarikçi ürünlerini güncelle

    guncelleAlisListesi(); // Alış listesini güncelle

    guncelleAlisSepeti(); // Alış sepetini güncelle

});

// Bu kısımda gerçekleşen olay, ürün alış butonuna basıldığında çalışacak. 
// Yani şu çağırıldığında : <button id="urunAlisButton" class="btn btn-outline-success btn-sm">Ürün Alış</button>
document.getElementById("urunAlisButton2").addEventListener("click", () => { 

    adminKontrolVeGoster("urunAlisForm");
    
    guncelleTedarikciUrunleri(); // Tedarikçi ürünlerini güncelle

    guncelleAlisListesi(); // Alış listesini güncelle

    guncelleAlisSepeti(); // Alış sepetini güncelle

});


document.getElementById("alisYapButton").addEventListener("click", aliseEkle); // Bu kısımda gerçekleşen olay, alış yap butonuna basıldığında çalışacak. Yani şu çağırıldığında : <button id="alisYapButton" class="btn btn-outline-success btn-sm">Alış Yap</button>

sermayeyiGuncelle(); // Sermayeyi güncelle : Bunu buraya da eklememizin sebebi, sayfa açılır açılmaz mevcut sermayeyi göstermek istememiz

guncelleCiroKar(); // Ciro ve karı güncelle : Bunu buraya da eklememizin sebebi, sayfa açılır açılmaz mevcut ciroyu(sayfa ilk açıldığında sermayeyi) ve karı göstermek istememiz


// Admin Bölümü

// Admin kontrol ve göster fonksiyonu Parametre olarak bölüm id'sini alacak (örn: "urunSatisForm") 
// ya da bölüm id'si yerine bölümün kendisini alabiliriz (örn: document.getElementById("urunSatisForm"))
function adminKontrolVeGoster(bolumId) { 

    var kullaniciAdi = prompt("Kullanıcı Adı:"); // Kullanıcı adı iste
    var sifre = prompt("Şifre:"); // Şifre iste

    if (kullaniciAdi === "admin" && sifre === "123") { // Eğer kullanıcı adı ve şifre doğruysa

        document.getElementById("urunSatisForm").style.display = "none"; // Ürün satış formunu gizle

        document.getElementById("marketUrunleri").style.display = "none"; // Market ürünlerini gizle

        document.getElementById("urunAlisForm").style.display = "none"; // Ürün alış formunu gizle

        document.getElementById(bolumId).style.display = "block"; // İstenilen bölümü göster
    } else {
        alert("Kullanıcı adı veya şifre hatalı"); // Kullanıcıya uyarı mesajı göster
    }
}
