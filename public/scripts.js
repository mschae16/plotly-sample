// const appendData = (object) => {
//   const { duration, host, path, time } = object;
//   $('.response-list')
//     .append(
//       `<li class='response-item'>
//         <p>Your request was made to route: ${path} from ${host} on ${time.split('T')[0]} at ${time.slice(11,16)} and the response took ${duration}ms.</p>
//       </li>`
//     );
// }
//
// const loadData = () => {
//   fetch('/api/v1/usage')
//     .then( response => {
//       if (response.status !== 200) {
//         console.log(response);
//       }
//       return response;
//     })
//     .then(response => response.json())
//     .then(parsedResponse => {
//       return parsedResponse.map( object => appendData(object))
//     })
//     .catch( error => console.log(error) );
// }
//
// $(window).on('load', loadData);

var data = [
  {
    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
    y: [1, 3, 6],
    type: 'scatter'
  }
];

var layout = {
  title: 'My Time Series',
};

Plotly.newPlot('graphs-container', data, layout);
