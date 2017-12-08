const loadData = () => {
  fetch('/api/v1/usage')
    .then( response => {
      if (response.status !== 200) {
        console.log(response);
      }
      return response;
    })
    .then(response => response.json())
    .then(parsedResponse => {
      const unpackData = (arr, key) => {
        return arr.map(obj => obj[key])
      }
      const data = [
        {
          type: 'scatter',
          mode: 'lines',
          name: 'Computer Usage',
          x: unpackData(parsedResponse, 'time'),
          y: unpackData(parsedResponse, 'mean_usage_user'),
          line: {color: '#17BECF'}
        }
      ];

      const layout = {
        title: 'My Time Series',
      };

      return Plotly.newPlot('graphs-container', data, layout);
    })
    .catch( error => console.log(error) );
}

$(window).on('load', loadData);
