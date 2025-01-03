/**
 * @class DTgawe
 * @description Represents a dynamic table created by gawe007.
 */
class DTgawe {
    /**
     * @constructor
     * @param {string} name - The name of the dynamic table.
     * @param {Array} data - The data to be displayed in the table.
     * @param {HTMLElement} parent - The parent element where the table will be appended.
     * @param {number} dataPerPage - The maximum number of data to be displayed per page.
     */
    constructor(name, data, parent, dataPerPage) {
        this.name = name ?? "Dynamic Table by gawe007";
        this.data = data ?? [];
        this.parent = parent ?? null;
        this.maxDataPerPage = dataPerPage || 10;
        if(this.data === null || this.data === "" || this.data === undefined) { return console.error("DTGawe error: Data isn't present or unreadable.")};
        if(typeof parent !== "object") {
            console.error("DTGawe error: Parent Element Not Detected!");
        }else{
            this.halaman = [];
            this.tableHeader = [];
            this.currentHalaman = 0;
            this.minimizeStatus = false;
            this.resizeStatus = false;
            this.sortOrder = "desc";
            this.originalData = JSON.parse(JSON.stringify(this.data));

            //Element creation
            this.cDiv = document.createElement("div");
            this.cSpan = document.createElement("span");
            this.cP = document.createElement("p");
            this.DynamicTable = this.cDiv.cloneNode();
            this.header = this.cDiv.cloneNode();
            this.body = this.cDiv.cloneNode();
            this.footer = this.cDiv.cloneNode();
            this.title = this.cDiv.cloneNode();
            this.menu = this.cDiv.cloneNode();
            this.searchbar = this.cDiv.cloneNode();
            this.rowError = this.cDiv.cloneNode();
            this.textError = this.cP.cloneNode();
            this.pagination = this.cDiv.cloneNode();
            this.pages = this.cDiv.cloneNode();
            this.breload = this.cSpan.cloneNode();
            this.bresize = this.cSpan.cloneNode();
            this.bminimize = this.cSpan.cloneNode();
            this.about = this.cDiv.cloneNode();
            this.formsearch = document.createElement("form");
            this.labelsearch = document.createElement("label");
            this.labelScope = this.labelsearch.cloneNode();
            this.inputsearch = document.createElement("input");
            this.areasearch = document.createElement("select");
            this.scopeOption = document.createElement("option");
            this.exportButton = this.cDiv.cloneNode();
            this.exportBody = this.cDiv.cloneNode();
            this.exportCsv = this.cSpan.cloneNode();
            this.labelfooter = this.cSpan.cloneNode();
            this.author = this.cSpan.cloneNode();
            this.prev = this.cSpan.cloneNode();
            this.next = this.cSpan.cloneNode();
            this.pageView = this.cDiv.cloneNode();
            this.aboutPage = this.cDiv.cloneNode();
            this.aboutPageBody = this.cDiv.cloneNode();
            this.aboutPageTitle = this.cDiv.cloneNode();
            this.aboutPageDesc = this.cDiv.cloneNode();
            this.aboutPageClose = this.cSpan.cloneNode();
            this.paragraph = this.cP.cloneNode();

            this.initialize();
        }
    }

    /**
     * @method initialize
     * @description Initializes the dynamic table by creating and appending the necessary elements.
     */
    initialize() {
        this.DynamicTable.id = "DynamicTable";
        this.header.classList.add("dt-header");
        this.body.classList.add("dt-body");
        this.footer.classList.add("dt-footer");
        this.title.classList.add("dt-title");
        this.menu.classList.add("dt-menu");
        this.searchbar.classList.add("dt-menu-body");
        this.formsearch.classList.add("dt-form-search");
        this.pagination.classList.add("dt-pagination");
        this.pages.classList.add("dt-pagination-pages");
        this.breload.classList.add("dt-reload-button");
        this.bresize.classList.add("dt-resize-window");
        this.bminimize.classList.add("dt-minimize-window");
        this.inputsearch.classList.add("dt-search-query");
        this.formsearch.classList.add("dt-search-form");
        this.areasearch.classList.add("dt-search-area");
        this.about.classList.add("dt-about");
        this.author.classList.add("dt-author");

        this.title.innerHTML = this.name;

        this.breload.innerHTML = "&#8634;";
        this.breload.addEventListener("click", () => { this.refresh(); });
        this.bresize.innerHTML = "&#128470;";
        this.bresize.addEventListener("click", () => { this.resize(); });
        this.bminimize.innerHTML = "&#8213;";
        this.bminimize.addEventListener("click", () => { this.minimize(); });
        this.menu.append(this.breload, this.bresize, this.bminimize);

        this.formsearch.id = "dt-id-search";
        this.labelScope.innerHTML = " in ";
        this.areasearch.name = "dt-search-area";
        this.areasearch.append(...this.getScopeAsElements(this.data));
        this.areasearch.addEventListener("change", ()=>{this.searchData(this.data);});
        this.labelScope.appendChild(this.areasearch);

        this.inputsearch.name = "dt-search-query";
        this.inputsearch.placeholder = "What are you looking?";
        this.inputsearch.id = "dt-query";
        this.inputsearch.addEventListener("keyup", () => {this.searchData(this.data); });
        this.labelsearch.innerHTML = "&#128270;";
        this.labelsearch.appendChild(this.inputsearch);
        this.formsearch.append(this.labelsearch, this.labelScope);
        this.searchbar.appendChild(this.formsearch);

        this.exportEnclosure = this.cDiv.cloneNode();
        this.exportEnclosure.classList.add("dt-export-enclosure");
        this.exportButton.innerHTML = "Export &nbsp;&nbsp;&nbsp;&nbsp;&#11147;";
        this.exportButton.classList.add("dt-export-button");
        this.exportButton.addEventListener("click", ()=>{this.toogleExport()});
        this.exportCsv.innerHTML = "&#128209; .CSV";
        this.exportCsv.classList.add("dt-export-csv");
        this.exportCsv.addEventListener("click", ()=>{this.downloadCSV()});
        this.exportBody.appendChild(this.exportCsv);
        this.exportBody.classList.add("dt-export-body");
        this.exportEnclosure.append(this.exportButton, this.exportBody);
        this.searchbar.append(this.exportEnclosure);

        this.rowError.classList.add("dt-row");
        this.rowError.classList.add("dt-row-no-data");
        this.textError.classList.add("dt-data");

        this.initializePagination();
        this.pagination.append(this.labelfooter, this.pages);

        this.author.innerHTML = "gawe007";
        this.about.appendChild(this.author);
        this.about.addEventListener("click", ()=>{this.toogleAboutPage(true)});

        this.aboutPageTitle.innerHTML = "Gawe Dynamic Table";
        this.aboutPageTitle.classList.add("dt-about-page-title");
        let aboutDesc = this.paragraph.cloneNode();
            aboutDesc.innerHTML = `Version 1.2.0`;
        let aboutDesc1 = this.paragraph.cloneNode();
            aboutDesc1.innerHTML = `&#9997; You can see my recent updates for this JS Class on <a href="https://github.com/gawe007/GaweDynamicTable">GaweDynamicTable</a> repository.`;
        let aboutDesc2 = this.paragraph.cloneNode();
            aboutDesc2.innerHTML = `&#128563; Or just visit <a href="https://github.com/gawe007">My GitHub</a>`;
        this.aboutPageDesc.append(aboutDesc, aboutDesc1, aboutDesc2);
        this.aboutPageDesc.classList.add("dt-about-page-desc");
        this.aboutPageClose.innerHTML = "&#10026;";
        this.aboutPageClose.classList.add("dt-about-page-close");
        this.aboutPageClose.addEventListener("click", ()=>{this.toogleAboutPage(false)});
        this.aboutPageBody.append(this.aboutPageTitle, this.aboutPageDesc, this.aboutPageClose);
        this.aboutPageBody.classList.add("dt-about-page-body");
        this.aboutPage.id = "dt-about-page";
        this.aboutPage.appendChild(this.aboutPageBody);
        this.aboutPage.addEventListener("click", ()=>{this.toogleAboutPage(false)});

        this.header.append(this.title, this.menu);
        this.pageHandler(1);
        this.footer.append(this.pagination, this.about);

        this.DynamicTable.append(this.header, this.searchbar, this.body, this.footer, this.aboutPage);
        this.parent.appendChild(this.DynamicTable);
    }

    /**
     * @method pageHandler
     * @description Handles the page navigation and updates the table accordingly.
     * @param {string|number} cd - The page number or "prev" or "next" to navigate to the previous or next page.
     */
    async pageHandler(cd) {
        this.inputsearch.value = ""; //Reset search
        if (cd === "prev") {
            let prevP = this.currentHalaman - 1;
            if (prevP >= 1) {
                await this.pageHandler(prevP);
                this.currentHalaman = prevP;
            }
        } else if (Number.isFinite(cd)) {
            if (cd <= this.halaman.length) {
                this.currentHalaman = cd;
                let selectedP = this.halaman[cd - 1].firstIndex;
                let jumlahData = this.halaman[cd - 1].jumlahData;
                let lastIndex = selectedP + jumlahData;

                this.body.replaceChildren(...this.getRowFromDataAsElements(this.data.slice(selectedP, lastIndex)));
                this.pageView.innerHTML = "Page " + this.currentHalaman + " out of " + this.halaman.length;
                this.resizeTableHeaderColumn();
            } else {
                console.error("Error: exceded page range");
            }
        } else if (cd === "next") {
            let nextP = this.currentHalaman + 1;
            if (nextP <= this.halaman.length) {
                await this.pageHandler(nextP);
                this.currentHalaman = nextP;
            }
        } else {
            console.error("Error Loading Page");
        }
    }

    /**
     * @method getRowFromDataAsElements
     * @description Generates an array of table row elements from the data.
     * @param {Array} datas - The data to be converted into table rows.
     * @returns {Array} - An array of table row elements.
     */
    getRowFromDataAsElements(datas) {
        let arrayEl = [];
        const tHeader = this.cDiv.cloneNode();
            tHeader.classList.add("dt-row");
        const tColNum = this.cDiv.cloneNode();
            tColNum.classList.add("dt-col-num");
        const tColData = this.cDiv.cloneNode();
            tColData.classList.add("dt-col-data");
            tColNum.innerHTML = "No";
            tHeader.append(tColNum);
        let headers = Object.getOwnPropertyNames(datas[0]);
        let arrHeaders = [];
        for(let i =0; i < headers.length; i++){

            const newTColValue = document.createElement('input');
                newTColValue.name = "value-"+i;
                newTColValue.id = "dt-value-col-"+i;
                newTColValue.type = "hidden";
                newTColValue.value = headers[i];

            const colSort = this.cSpan.cloneNode();
                colSort.classList.add("dt-col-sort");
                colSort.innerHTML = this.sortSymbol();
                colSort.id = "dt-col-"+i;
                colSort.addEventListener("click", ()=>{this.toogleSort(i, this.sortOrder)});
            const newTColData = tColData.cloneNode();
                newTColData.innerHTML = "<p class='dt-data'>"+headers[i]+"</p>";
                newTColData.append(colSort, newTColValue);
                arrHeaders.push(newTColData);
        }
        tHeader.append(...arrHeaders);
        arrayEl.push(tHeader);

        for (let d = 0; d < datas.length; d++) {
            let arrColData = [];
            const row = this.cDiv.cloneNode();
            row.classList.add("dt-row");

            const columnNum = this.cDiv.cloneNode();
            columnNum.classList.add("dt-col-num");
            columnNum.innerHTML = ((d + 1)+((this.currentHalaman - 1) * this.maxDataPerPage)) + ".";

            const objData = datas[d];
            for (const [key, value] of Object.entries(objData)) {
                const colData = this.cDiv.cloneNode();
                colData.classList.add("dt-col-data");
                colData.innerHTML = `<p class='dt-data'>${value}</p>`;
                arrColData.push(colData);
            }
            row.appendChild(columnNum);
            row.append(...arrColData);
            arrayEl.push(row);
        }

        return arrayEl;
    }

    /**
     * @method initializePagination
     * @description Initializes the pagination by calculating the number of pages and creating the pagination elements.
     */    
    initializePagination() {
        this.currentHalaman = 1;
        let jumlahHalaman;
        let firstData = 0;
        let group = Math.floor(this.data.length / this.maxDataPerPage);
        let remain = (this.data.length % this.maxDataPerPage);
            jumlahHalaman = group + 1;
        for (let i = 1; i < jumlahHalaman; i++) {
            let temp = firstData * this.maxDataPerPage;
            firstData += 1;
            let a = { page: i, firstIndex: temp, jumlahData: this.maxDataPerPage };
            this.halaman.push(a);
        }
        let lastPageIndex = this.data.length - remain;
        let lastBatchData = { page: jumlahHalaman, firstIndex: lastPageIndex, jumlahData: remain };
        this.halaman.push(lastBatchData);

        this.labelfooter.innerHTML = "Total : " + this.data.length + " rows | Showing max " + this.maxDataPerPage + " rows for every page";
        this.pages.append(...this.generatePaginationElements(1));
    }

    /**
     * @method generatePaginationElements
     * @description Generates an array of pagination elements.
     * @param {number} selectedPage - The currently selected page.
     * @returns {Array} - An array of pagination elements.
     */
    generatePaginationElements(selectedPage) {
        const arrayEl = [];

        this.prev.classList.add("dt-page");
        this.prev.innerHTML = "&#9111; Prev";
        this.prev.addEventListener("click", () => { this.pageHandler("prev"); });

        this.next.classList.add("dt-page");
        this.next.innerHTML = "Next &#9112;";
        this.next.addEventListener("click", () => { this.pageHandler("next"); });

        this.pageView.innerHTML = "Page " + this.currentHalaman + " out of " + this.halaman.length;
        this.pageView.classList.add("dt-page");

            arrayEl.push(this.prev);
            arrayEl.push(this.pageView);
            arrayEl.push(this.next);

        return arrayEl;
    }

    /**
     * @method getScopeAsElements
     * @description Converts the scope options into an array of option elements.
     * @param {Array} datas - The data to be used as scope options.
     * @returns {Array} - An array of option elements.
     */
    getScopeAsElements(datas) {
        let arr = Object.getOwnPropertyNames(datas[0]);
        let arrEl = [];
        let i = 0;
        arr.forEach((el)=>{
            const option = document.createElement("option");
                option.selected = i === 0 ? "selected" : false ;
                option.value = i;
                option.innerHTML = el;
                arrEl.push(option);
                i++;
        });

        return arrEl;
    }

    /**
     * @method searchData
     * @description Searches the data based on the query and updates the table accordingly.
     * @param {Array} stack - The data to be searched.
     */
    searchData(stack) {
        let query = document.getElementById("dt-query").value;
        let resultData = [];
        let scope = this.areasearch.options[this.areasearch.selectedIndex].value;
        const like = (search, haystack) => {
            if (typeof search !== 'string' || haystack === null) {return false; }
            // Remove special chars
            search = search.replace(new RegExp("([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-])", "g"), "\\$1");
            // Replace % and _ with equivalent regex
            search = search.replace(/%/g, '.*').replace(/_/g, '.');
            // Check matches
            return RegExp('^' + search + '$', 'gi').test(haystack);
        }  

        if (query == null || query == "" || query == "undefined") {
            this.pageHandler(1);
        } else {
            for(let i = 0; i<this.data.length; i++){
                if(like("%"+query+"%", Object.values(this.data[i])[scope])){
                    if(resultData.length < this.maxDataPerPage){
                        resultData.push(this.data[i]);
                    }
                }
            }
            if (resultData.length > 0) {
                this.body.replaceChildren(...this.getRowFromDataAsElements(resultData));
                this.resizeTableHeaderColumn();
            } else {
                this.textError.innerHTML = "There's no matching data. Please  &#8634; this table to refresh the view.";
                this.rowError.appendChild(this.textError);
                this.body.replaceChildren(this.rowError);
            }
        }
    }

    
    /**
     * @method resizeTableHeaderColumn
     * @description Resizes the table header and columns to fit the content.
     */    
    resizeTableHeaderColumn() {
        setTimeout(()=>{
            if(this.body.hasChildNodes){
                const tHeader = this.body.children[0];
                const childNo2 = this.body.children[1];
                const bodyChildren = this.body.children;
                if(tHeader.children.length === childNo2.children.length){
                    let arrColumn = [];
                    let widthBody = parseFloat(window.getComputedStyle(this.body).getPropertyValue("width")) - 20;
                    let divideWidthByChildren = widthBody / (bodyChildren[0].children.length - 1);
                    for(let x=0; x<bodyChildren.length; x++) {
                        for(let d=0; d<bodyChildren[x].children.length; d++){
                            bodyChildren[x].children[d].style = `width: ${divideWidthByChildren}px`;
                        }
                    }
                    for(let s= 0; s < childNo2.children.length; s++) {
                        const elRect = window.getComputedStyle(childNo2.children[s]);
                            arrColumn.push(elRect.getPropertyValue("width"));
                    }
                    for(let i=0; i < tHeader.children.length; i++) {
                        tHeader.children[i].style = `width: ${arrColumn[i]};`;
                    }
                } else {
                    this.textError.innerHTML = "Error. The header dimension does not match with the data!";
                    this.rowError.appendChild(this.textError);
                    this.body.replaceChildren(this.rowError);
                }
            }
        })
    }

    /**
     * @method toogleAboutPage
     * @description Close or open About Page.
     */
    toogleAboutPage(act) {
        if(!this.minimizeStatus) {
            if(act) {
                this.aboutPage.style = "display: flex; opacity: 1; top: 0px; left: 0px;";
            } else {
                this.aboutPage.style = "display: none; opacity: 0;";
            }
        }
    }

    /**
     * @method toogleExport
     * @description Show/hide the dropdown menu for Export
     */
    toogleExport() {
        const displayDDExport = this.exportBody.style.display || "none";
        console.log("display", displayDDExport);
        if(displayDDExport === "none"){
            this.exportButton.classList.add("dt-export-button-selected");
            this.exportBody.style.display = "block";
        } else {
            this.exportButton.classList.remove("dt-export-button-selected");
            this.exportBody.style.display = "none";
        }
    }

    /**
     * @method minimize
     * @description Minimizes or expands the table.
     */
    minimize() {
        if (!this.minimizeStatus) {
            this.DynamicTable.style = "display:block; max-height: 45px";
            this.minimizeStatus = true;
        } else {
            this.DynamicTable.style = "display:block; max-height: auto;";
            this.minimizeStatus = false;
        }
    }

    /**
     * @method resize
     * @description Resizes or restores the table.
     */    
    resize() {
        if (!this.resizeStatus) {
            this.DynamicTable.style = "display:block;position: fixed; top: 10px; left: 10px; max-width: 90%; max-height: 90%; overflow: hidden; z-index:2;";
            this.resizeStatus = true;
        } else {
            this.DynamicTable.style = "position: relative; min-width: 360px; max-height: 1000px; z-index:0;";
            this.resizeStatus = false;
        }
    }

    /**
     * @method refresh
     * @description Refresh the view and reloads the original data.
     */
    refresh() {
        this.data = JSON.parse(JSON.stringify(this.originalData));
        this.pageHandler(1);
    }

    /**
     * @method convertDataToCsv
     * @description Convert the data into array of data delimitinated by comma and new line.
     * @param {Array} stream - The array of objects to be converted.
     * @returns {Array} - converted Data.
     */
    convertCSV(stream) {
        const data = stream;
        const headers = Object.keys(data[0]);
        let values = [];
        values.push("No,"+headers);

        for(let i = 0; i < data.length; i++) {
            values.push((i+1)+","+Object.values(data[i]));
        }

        return values.join("\n");
    }

    /**
     * @method downloadCSV
     * @description Download data as CSV file.
     */
    async downloadCSV(){
        const download = (data) => {
            const blob = new Blob([data], { type: 'text/csv' });          
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.href = url;
            a.download = this.name+'.csv'; 
            a.click();                      //Trigger download
        }
        const csv = this.convertCSV(this.data);
        download(csv);
        this.toogleExport();
    }

    /**
     * @method sortSymbol
     * @description Return UTF-8 triangle symbol for sort button.
     * @param {String} order - The sorting order.
     * @returns {String} - UTF-8 Symbol in HTML Entity.
     */
    sortSymbol() {
        return this.sortOrder === "asc" ? "&#9661;" : this.sortOrder === "desc" ? "&#9651;" : console.error("DTGawe error: Something wrong.");
    }

    /**
     * @method toogleSort
     * @description Toogle sort by column number when clicked
     * @param {String} num - The column number
     * @param {String} action - The sort order to be executed
     */
    toogleSort(num, action) {
        const el = document.getElementById("dt-value-col-"+num);

        //Sort the data
        action === "asc" ? this.data.sort((a,b)=> b[el.value].localeCompare(a[el.value])) 
        : action === "desc" ? this.data.sort((a,b)=> a[el.value].localeCompare(b[el.value])) 
        : console.error("DTGawe error: Something Wrong");

        //Setting next sort button action
        action === "desc" ? this.sortOrder = "asc" 
        : action === "asc" ? this.sortOrder = "desc" 
        : console.error("DTGawe error: Something Wrong");

        //Refresh the view body
        this.pageHandler(1);
    }
}
