const ctx = document.getElementById('myChart');
/* myChart id'sine sahip bir <canvas> elementine atıfta bulunur. 
Bu element, Chart.js tarafından grafiğin çizileceği yerdir.
*/
const line = document.getElementById('myLine');

/* =====================PASTA GRAFİĞİ===================== */

new Chart(ctx, {
  /* new Chart() ifadesi, Chart.js kütüphanesinde tanımlı bir Chart sınıfının 
  yeni bir örneğini (instance) oluşturur. 
  
  ctx, grafiğin çizileceği <canvas> elementini temsil eder. İkinci parametre ise (type: 'pie')grafiğin türü,
  verisi ve opsiyonları gibi yapılandırma bilgilerini içeren bir nesnedir.
  */
  type: 'pie',
  data: { /*  data nesnesi, grafikte gösterilecek etiketler ve veriler gibi bilgileri içerir. */
    /* Bu satır, grafik için kullanılacak veri ve etiketleri (labels) tanımlayan bir nesneyi başlatır. */
    labels: ['Şampuan', 'Sprey', 'Krem', 'Saç Boyası'],
    /* labels array'i (dizisi), pasta grafiğindeki her bir dilimin neyi temsil edeceğini belirler. */
    datasets: [{ /* datasets array'inin içinde bir veya birden fazla veri seti tanımlanabilir. Bu veri setleri,
      grafikteki farklı serileri (örneğin, pasta dilimleri) temsil eder. */
      label: '# Yüzdelik Dilim', /* label özelliği, grafik üzerinde görünen veri setinin ismini belirtir.  */
      data: [12, 5, 2, 3],

      // Dilimlerin renkleri
      backgroundColor: [
        'rgb(156, 210, 8)',  
        'rgb(80, 89, 98)',  
        'rgb(210, 8, 156)',  
        'rgb(8, 156, 210)',  
      ],
      borderWidth: 1
    }]
  },
  options: {
    /*Bu satır, grafiğin genel görünüm ve davranışını etkileyen seçenekleri (options) 
    tanımlayan bir nesneyi başlatır.*/
    responsive: true,/* Bu satır, grafiğin responsive olmasını sağlar. */
  }
});

/* =====================ÇİZGİ GRAFİĞİ===================== */

new Chart(line, {
  type: 'line',
  data: {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    datasets: [{
      label: '# En Yüksek Satış',
      data: [12, 19, 3, 5, 2, 3, 22, 32, 12, 2, 1, 25,],
      borderWidth: 1,

      //Çizgi rengi
      borderColor: 'rgb(156, 210, 8)',
      
      // Alan rengi (çizginin altındaki bölge)
      backgroundColor: 'rgb(102, 135, 12)',

      // Noktaların iç rengi
      pointBackgroundColor: 'rgb(102, 135, 12)',

      
    }]
  },
  options: {
    responsive: true,
  }
});