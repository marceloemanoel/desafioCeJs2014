(function(window){
      window.ScreenBuilder = function() {
        
        function makeItRequired(input) {
            input.setAttribute("required", "");
            input.setAttribute("aria-required", "true");
        }
        
        function createCheckbox(field) {
            var DOMDiv = document.createElement("div"),
                DOMLabel = document.createElement("label"),
                DOMInput = document.createElement("input");
            
            DOMInput.type = field.type;
            DOMInput.id = "_" + field.name;
            DOMInput.name = field.name;
            
            if(field.mandatory) {
                makeItRequired(DOMInput);
            }

            DOMLabel.appendChild(DOMInput);
            DOMLabel.appendChild(document.createTextNode(field.name + (field.mandatory ? "*" : "")));
            
            DOMDiv.className = "checkbox";
            DOMDiv.appendChild(DOMLabel);
            
            return DOMDiv;
        }
        
        function createButton(field) {
            var DOMSubmit = document.createElement("button");
            
            DOMSubmit.type = "button";
            DOMSubmit.className = "btn btn-default";
            DOMSubmit.innerText = field.name;
            
            return DOMSubmit;
        }
        
        function createCommonInput(field) {
            var DOMDiv = document.createElement("div"),
                DOMLabel = document.createElement("label"),
                DOMInput = document.createElement("input");
            
            DOMDiv.className = "form-group";
            DOMDiv.appendChild(DOMLabel);
            DOMDiv.appendChild(DOMInput);
                
            DOMInput.id = "_"+field.name;
            DOMInput.name = field.name;
            DOMInput.type = field.type;
            DOMInput.className = "form-control";

            if(field.mandatory) {
                makeItRequired(DOMInput);
            }
    
            DOMLabel.innerText = field.name + (field.mandatory ? "*" : "");
            DOMLabel.className = "control-label";
            DOMLabel.for = DOMInput.id;
            
            return DOMDiv;
        }
        
        function createField(field) {
            var specialCases = {
                    "checkbox": createCheckbox,
                    "button": createButton
                };
            
            if(specialCases[field.type]) {
                return specialCases[field.type](field);
            }
            else {
                return createCommonInput(field);
            }
        }
        
        function createSection(section) {
            var DOMSection = document.createElement("section"),
                DOMHeader = document.createElement("header"),
                DOMH3 = document.createElement("h3");

            DOMH3.innerText = section.description;
            DOMHeader.appendChild(DOMH3);
            DOMSection.appendChild(DOMHeader);

            section.fields.forEach(function(field){
                DOMSection.appendChild(createField(field));
            });
            
            return DOMSection;
        }
        
        this.build = function(screen) {
            var DOMForm = document.createElement("form");
            DOMForm.role = "form";
            
            screen.sections.forEach(function(section) {
                DOMForm.appendChild(createSection(section));
            });
            return DOMForm;
        };
    }
})(window);
