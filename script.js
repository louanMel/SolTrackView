Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#555555';
Chart.defaults.color = '#FFFFFF';    
    
const cvs = document.getElementById('myLine');
const labels = [2018,2019,2020,2021,2022,2023]
const datas=[1560, 2310, 1700.20, 2500, 998, 100];
new Chart(cvs, {
    type: 'line', //
    data: {
        labels: labels,
        datasets: [{
          label: '€ Expenses',
          data: datas,
          borderWidth: 1,
          fill: false,
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgb(255, 0, 0)',
          tension: 0.5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });