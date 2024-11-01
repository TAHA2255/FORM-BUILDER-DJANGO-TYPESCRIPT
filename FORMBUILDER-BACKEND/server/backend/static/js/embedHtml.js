async function appendEmbedCode() {
    // Select parent divs with class names starting with "clicflo_"
    var parentDivs = document.querySelectorAll('[class^="clicflo_"]');

    // Extract class names and get the first class name
    var classNames = Array.from(parentDivs).map(div => div.className);
    var id = classNames.length > 0 ? classNames[0].split("_")[1] : '';


    try {
        // Fetch embed code HTML and CSS
        var response = await fetch(`http://localhost:8000/api/v1/widget/embed-code/${id}/html/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        });
        const data = await response.json();

        // Insert the HTML into the element with the matching class name
        var elements = document.querySelector(`[class^="clicflo_${id}"]`);
        if (elements) {
            elements.innerHTML = data.html;
        } else {
            console.error('Element with the specified class not found.');
        }

        // Append the CSS to the document head
        var style = document.createElement('style');
        style.textContent = data.css;
        document.head.appendChild(style);


        // Add the two CSS files to the header
        var link1 = document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href = './backend/static/semantic.min.css';
        document.head.appendChild(link1);

        var link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = './backend/static/optimajet-formbuilder.css';
        document.head.appendChild(link2);

        // Attach event listener to the save button

        // var button = document.getElementsByTagName('Button')[0];
        // if (button) {
        //     if (button.name === 'btnSave') {
        //         button.addEventListener("click", getFormValues);
        //     } else if(button.name === 'submitButton' && button.textContent === 'Submit Feedback') {
        //         button.addEventListener("click", getfeedbackFormValues);
        //     }
        //      else if(button.name === 'submitButton' && button.textContent === 'Submit Survey') {
        //         button.addEventListener("click", getsurveyFormValues);
        //     }
        //      else if (button.name === 'submitButton') {
        //         button.addEventListener("click", getdonationFormValues);
        //     }
        //     else if (button.name === 'sendbutton') {
        //         button.addEventListener("click", getcontactFormValues);
        //     } 
        // } else {
        //     console.error('Save button not found.');
        // }
        var button = document.getElementsByTagName('Button')[0];
        if (button) {
            button.addEventListener("click", handleFormSubmit);
        } else {
            console.error('Save button not found.');
        }

    } catch (e) {
        console.error('Error fetching embed code:', e);
    }
}


appendEmbedCode();

async function handleFormSubmit(e) {
    e.preventDefault();

    var formContainerSelector = '';
    var formSelector = '';
    var isMultipleForms = false;

    // Determine which forms to handle based on button properties
    if (e.target.name === 'btnSave') {
        formContainerSelector = 'form[name="form_1"]';
    } else if (e.target.name === 'submitButton' && e.target.textContent === 'Submit Feedback') {
        formContainerSelector = 'form[name="customerDetails"]';
    } else if (e.target.name === 'submitButton' && e.target.textContent === 'Submit Survey') {
        formContainerSelector = 'div[name="surveyFormContainer"] form';
        isMultipleForms = true;
    } else if (e.target.name === 'submitButton') {
        formContainerSelector = 'div[name="donationFormContainer"] form';
        isMultipleForms = true;
    } else if (e.target.name === 'sendbutton') {
        formContainerSelector = 'form[name="contactform"]';
    }

    // Select forms based on the selector
    var forms = isMultipleForms ? document.querySelectorAll(formContainerSelector) : [document.querySelector(formContainerSelector)];

    var formData = {};
    var formData2 = {};

    // Iterate through each form and collect data
    forms.forEach(function(form) {
        var inputFields = form.querySelectorAll('input, textarea');
        var selectFields = form.querySelectorAll('div[data-buildertype="dropdown"]');

        // Handle input fields
        inputFields.forEach(function(input) {
            if (input.type === 'checkbox') {
                formData[input.name] = formData[input.name] || [];
                formData2[input.name] = formData2[input.name] || [];
                if (input.checked) {
                    formData[input.name].push(input.value);
                    formData2[input.name].push(input.value);
                }
            } else {
                formData[input.name] = input.value;
                formData2[input.name] = input.value;
            }
        });

        // Handle dropdown fields
        selectFields.forEach(function(dropdown) {
            var selectedOption = dropdown.querySelector('div.item.active.selected span.text');
            if (selectedOption) {
                formData[dropdown.getAttribute('name')] = selectedOption.textContent;
                formData2[dropdown.getAttribute('name')] = selectedOption.textContent;
            }
        });
    });

    // Extract form ID from class names if needed
    var parentDivs = document.querySelectorAll('[class^="clicflo_"]');
    var classNames = Array.from(parentDivs).map(function(div) {
        return div.className;
    });
    var id = classNames.length > 0 ? classNames[0].split("_")[1] : '';

    // Initialize FormData for file uploads
    var data = new FormData();
    var dataFilesResp = {};
    var dataFilesRespId = '';

    for (let input of document.querySelectorAll('input[type="file"]')) {
        if (input.files.length > 0) {
            data.append('field_name', 'attachments');
            data.append('files', input.files[0]);
            data.append('widget', id);

            try {
                let response = await fetch('http://localhost:8000/api/v1/widget/data-files/create/', {
                    method: "POST",
                    body: data
                });
                let jsonResponse = await response.json();
                dataFilesResp = jsonResponse;
                dataFilesRespId = jsonResponse.id;
                formData2['attachments'] = jsonResponse.files;
                formData.attachments = dataFilesRespId;
            } catch (e) {
                console.log(e);
            }
        }
    }

    // Create data object to send
    var dataToSend = {
        "data_json": formData
    };

    // Determine storage option
    var selection = '';

    try {
        let apiresponse = await fetch(`http://localhost:8000/api/v1/widget/embed-code/${id}/retrieve/`, {
            method: "GET",
        });
        let json_Response = await apiresponse.json();
        selection = json_Response.selection;
    } catch (e) {
        console.log(e);
    }

    if (selection === 'Sheets') {
        // Remove fake file paths
        for (let key in formData2) {
            if (formData2[key].includes("C:\\fakepath\\")) {
                delete formData2[key];
            }
        }

        // Send data to Google Sheets
        try {
            await fetch('https://script.google.com/macros/s/AKfycbwari1GxBJlTYxANeGixG2YJb7q2RDa2m9q4ajI6y0fNHR8T8OkIuJHGTK1syMKUaBQ/exec', {
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(formData2)
            });
        } catch (e) {
            console.log(e);
        }
    } else {
        // Send data to the server
        try {
            await fetch(`http://localhost:8000/api/v1/widget/data/${id}/create/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(dataToSend)
            });
        } catch (e) {
            console.log(e);
        }
    }
}
