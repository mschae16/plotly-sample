const appendData = (object) => {
  const { duration, host, path, time } = object;
  $('.response-list')
    .append(
      `<li class='response-item'>
        <p>Your request was made to route: ${path} from ${host} on ${time.split('T')[0]} at ${time.slice(11,16)} and the response took ${duration}ms.</p>
      </li>`
    );
}

const loadData = () => {
  fetch('/api/v1/responses')
    .then( response => {
      if (response.status !== 200) {
        console.log(response);
      }
      return response;
    })
    .then( response => response.json() )
    .then( parsedResponse => {
      return parsedResponse.map( object => appendData(object) )
    })
    .catch( error => console.log(error) );
}

$(window).on('load', loadData);