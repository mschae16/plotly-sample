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
      const firstTrace = {
        type: 'scatter',
        mode: 'lines',
        name: 'Mean User Usage',
        x: unpackData(parsedResponse, 'time'),
        y: unpackData(parsedResponse, 'mean_usage_user'),
        line: {color: '#17BECF'}
      }
      const secondTrace = {
        type: "scatter",
        mode: "lines",
        name: 'Mean System Usage',
        x: unpackData(parsedResponse, 'time'),
        y: unpackData(parsedResponse, 'mean_usage_system'),
        line: {color: '#7F7F7F'}
      }
      const data = [firstTrace, secondTrace];
      const layout = {
        title: 'Local CPU Usage',
      };
      return Plotly.newPlot('graphs-container', data, layout);
    })
    .catch( error => console.log(error) );
}

$(window).on('load', loadData);
