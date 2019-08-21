(function(d) {
    const harmonyAPIPort = 9999;
    const usersEndpoint = '/users'; 
    const form = document.querySelector('#userForm');
    let jsonFormData;
    
    // I borrowed this ...
    // It's basically just mapping reduce function to an object. Need to explore if I can just
    // use forEach here. What I gain is that third param that I can pass in and reduce to a fully formed
    // JSON form data, but not sure if that is sensible use of reduce.
    let formToJSON = (formElements) => [].reduce.call(formElements, (data, element) => {
            data[element.name] = element.value;
            return data;
     }, {}) 
        
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        jsonFormData = formToJSON(form.elements);
        console.log("data", jsonFormData);
        fetch(`http://localhost:${harmonyAPIPort}${usersEndpoint}`, {
            method: 'POST',
            body: JSON.stringify(jsonFormData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });

    
})(document);