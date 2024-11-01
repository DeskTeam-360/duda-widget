const mainTab = document.getElementById('myTabContent')
const makeDetail = document.getElementById('makeDetail')
const contentPNPage = document.getElementById('contentPNPage')
const PartsDetail = document.getElementById('PartsDetail')
mainTab.style.display = 'block';
PartsDetail.style.display = 'none';
makeDetail.style.display = 'none';
contentPNPage.style.display = 'none';
$(document).ready(function () {
    document.getElementById('part-number-tab').addEventListener('click', (e) => {
        $('#application').removeClass('show').removeClass('active');
        $('#interchange').removeClass('show').removeClass('active');
        $('#specification').removeClass('show').removeClass('active');
        $('#part-number').addClass('show').addClass('active');
        $('#application-tab').removeClass('active');
        $('#interchange-tab').removeClass('active');
        $('#specification-tab').removeClass('active');
        $('#part-number-tab').addClass('active');

        mainTab.style.display = 'block'
        PartsDetail.style.display = 'none';
        makeDetail.style.display = 'none';
        contentPNPage.style.display = 'none';
    })
    document.getElementById('application-tab').addEventListener('click', (e) => {
        $('#part-number').removeClass('show').removeClass('active');
        $('#interchange').removeClass('show').removeClass('active');
        $('#specification').removeClass('show').removeClass('active');
        $('#application').addClass('show').addClass('active');
        $('#application-tab').addClass('active');
        $('#interchange-tab').removeClass('active');
        $('#specification-tab').removeClass('active');
        $('#part-number-tab').removeClass('active');
        mainTab.style.display = 'block'
        PartsDetail.style.display = 'none';
        makeDetail.style.display = 'none';
        contentPNPage.style.display = 'none';
    })
    document.getElementById('interchange-tab').addEventListener('click', (e) => {
        $('#part-number').removeClass('show').removeClass('active');
        $('#application').removeClass('show').removeClass('active');
        $('#specification').removeClass('show').removeClass('active');
        $('#interchange').addClass('show').addClass('active');
        $('#application-tab').removeClass('active');
        $('#interchange-tab').addClass('active');
        $('#specification-tab').removeClass('active');
        $('#part-number-tab').removeClass('active');
        mainTab.style.display = 'block'
        PartsDetail.style.display = 'none';
        makeDetail.style.display = 'none';
        contentPNPage.style.display = 'none';
    })
    document.getElementById('specification-tab').addEventListener('click', (e) => {
        $('#part-number').removeClass('show').removeClass('active');
        $('#application').removeClass('show').removeClass('active');
        $('#interchange').removeClass('show').removeClass('active');
        $('#specification').addClass('show').addClass('active');
        $('#application-tab').removeClass('active');
        $('#interchange-tab').removeClass('active');
        $('#specification-tab').addClass('active');
        $('#part-number-tab').removeClass('active');
        mainTab.style.display = 'block'
        PartsDetail.style.display = 'none';
        makeDetail.style.display = 'none';
        contentPNPage.style.display = 'none';
    })
});
document.getElementById("year").addEventListener("change", function (event) {
    searchApplicationSelect('year')
});
document.getElementById("model").addEventListener("change", function (event) {
    searchApplicationSelect('model')
});
document.getElementById("make").addEventListener("change", function (event) {
    searchApplicationSelect('make')
});
document.getElementById("part_type").addEventListener("change", function (event) {
    searchApplicationSelect()
});
document.getElementById("engine").addEventListener("change", function (event) {
    searchApplicationSelect('engine')
});
$(document).ready(function () {
    $('#makeDetailTable_length').css("display", "none");
    $('#makeDetailTable_info').css("display", "none");
    $('#resultsTable').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50],
        "searching": false,
        "ordering": false,
        "language": {
            "paginate": {
                "previous": "<i class='fas fa-chevron-left'></i>", "next": "<i class='fas fa-chevron-right'></i>"
            }
        }
    });
    $('#resultsTable_length').css("display", "none");
    $('#resultsTable_info').css("display", "none");
    $('#resultsApplication').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50],
        "searching": false,
        "ordering": false,
        "language": {
            "paginate": {
                "previous": "<i class='fas fa-chevron-left'></i>", "next": "<i class='fas fa-chevron-right'></i>"
            }
        }
    });
    $('#resultsApplication_length').css("display", "none");
    $('#resultsApplication_info').css("display", "none");
    $('#resultsInterchange').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50],
        "searching": false,
        "ordering": false,
        "language": {
            "paginate": {
                "previous": "<i class='fas fa-chevron-left'></i>", "next": "<i class='fas fa-chevron-right'></i>"
            }
        }
    });
    $('#resultsInterchange_length').css("display", "none");
    $('#resultsInterchange_info').css("display", "none");
    $('#resultSpecification').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50],
        "searching": false,
        "ordering": false,
        "language": {
            "paginate": {
                "previous": "<i class='fas fa-chevron-left'></i>", "next": "<i class='fas fa-chevron-right'></i>"
            }
        }
    });
    $('#resultSpecification_length').css("display", "none");
    $('#resultSpecification_info').css("display", "none");
});

async function partNumber(partType, partNumber) {
    let datas;
    if (partType === "Valves") {
        let {data, error} = await _supabase
            .from('engines_valves')
            .select('*')
            .limit(1)
            .eq('mw', partNumber)
        datas = data
    } else {
        let {data, error} = await _supabase
            .from('engines')
            .select('*')
            .limit(1)
            .eq('mw', partNumber)
        datas = data
    }

    if ($.fn.DataTable.isDataTable('#resultsTable')) {
        $('#resultsTable').DataTable().clear().destroy();
    }
    const resultsBody = document.getElementById("resultsBodyPartNumber");
    resultsBody.innerHTML = '';
    const resultsBodyApp = document.getElementById("resultsBodyApp");
    resultsBodyApp.innerHTML = '';

    if (datas[0] != null && datas[0] != []) {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td><a onclick="partNumberDetailCall('mw','${datas[0]['mw']}',null,'${partType}')" href="#">${datas[0]['mw']}</a></td>
                    <td>${partType}</td>
                    <td>${datas[0]['Type'] ?? ''}</td>
               `;
        resultsBody.appendChild(row);
    }



    try {
        $('#resultsTable').DataTable({
            autoWidth: false, scrollX: true
        });
        $("#resultsTable_length > label > select").val("10").change();
    } catch (e) {
        $("#resultsTable_length > label > select").val("10").change();
    }
}

document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const pNumber = this.part_number.value.trim();
    let pType = this.type.value.trim();
    // if  (pNumber===""||pNumber===null){
    //     this.part_number.error("This")
    //     return
    // }
    if (pType === "All") {
        if (pNumber.charAt(0) === "W") {
            pType = "Valve Seat";
        } else if (pNumber.charAt(0) === "M") {
            pType = "Valves";
        }
    }

    // Start loading
    const submitButton = this.querySelector("input[type='submit']");
    const spinner = this.querySelector(".spinner-border");

    submitButton.disabled = true; // Disable the button
    spinner.style.display = 'inline-block'; // Show the spinner

    await partNumber(pType, pNumber)

    // Stop loading
    submitButton.disabled = false; // Enable the button
    spinner.style.display = 'none'; // Hide the spinner

});

async function searchApplicationSelect(onChange) {
    let year = document.getElementById("year");
    let make = document.getElementById("make");
    let model = document.getElementById("model");
    let partType = document.getElementById("part_type");
    let engine = document.getElementById("engine");
    let param1, param2, param3, param4, param5;

    param1 = year.value === "All" ? null : year.value
    param2 = make.value === "All" ? null : make.value
    param3 = model.value === "" ? null : model.value
    param5 = partType.value === "All" ? null : partType.value
    param4 = engine.value === "All" ? null : engine.value
    if (param3 === null) {
        return
    }
    if (onChange.includes(["year"])) {
        make.innerHTML = "<option value='All'>All</option>";
        let makes = [];
        let {data: dataMake1, error: e2} = await _supabase
            .rpc('get_valve_data_make_v2', {
                param1, param2, param3, param4, param5
            });
        dataMake1.map(item => {
            makes.push(item['make']);
            make.innerHTML += `<option value="${item['make']}" ${item['make'] === param2 ? 'selected' : ''}>${item['make']}</option>`;
        })
    }
    if (onChange.includes(["make"])) {
        model.innerHTML = "<option value='All'>All</option>";
        let models = [];
        let {data: dataModel1, error: e3} = await _supabase
            .rpc('get_valve_data_model_v2', {
                param1, param2, param3, param4, param5
            });
        dataModel1.map(item => {
            models.push(item['model']);
            model.innerHTML += `<option value="${item['model']}" ${item['model'] === param3 ? 'selected' : ''}>${item['model']}</option>`;
        })
    }
    if (onChange.includes(["model"])) {
        engine.innerHTML = "<option value='All'>All</option>";
        let engines = [];
        let {data: dataEngine1, error: e4} = await _supabase
            .rpc('get_valve_data_engine_v2', {
                param1, param2, param3, param4, param5
            });
        dataEngine1.map(item => {
            engines.push(item['engine']);
            engine.innerHTML += `<option value='${item["engine"]}' ${item['engine'] === param4 ? 'selected' : ''}>${item['engine']}</option>`;
        })
    }
}

// Initialize DataTable with Pagination and other options
async function searchApplication(year, make, model, partType, engine) {
    year = year !== "All" ? year : null
    make = make !== "All" ? make : null
    model = model !== "All" ? model : null
    partType = partType !== "All" ? partType : null
    engine = engine !== "All" ? engine : null
    const {data, error} = await _supabase.rpc('get_engine_data', {
        param1: year, param2: make, param3: model, param4: engine, param5: partType,
    });
    return data
}

document.getElementById("searchApplication").addEventListener("submit", function (event) {
    event.preventDefault();
    const year = this.year.value.trim();
    const make = this.make.value.trim();
    const model = this.model.value.trim();
    const part_type = this.part_type.value.trim();
    const engine = this.engine.value.trim();
    const data = searchApplication(year, make, model, part_type, engine);
    const results = document.getElementById("resultsMakeDetail");


    // Start loading
    const submitButton = this.querySelector("input[type='submit']");
    const spinner = this.querySelector(".spinner-border");

    submitButton.disabled = true; // Disable the button
    spinner.style.display = 'inline-block'; // Show the spinner

    data.then(items => {
        if ($.fn.DataTable.isDataTable('#resultsApplication')) {
            $('#resultsApplication').DataTable().clear().destroy();
        }
        results.innerHTML = "";
        const rows = items.map(item => `
             <tr>
                        <td>${item['Year']}</td>
                        <td><a onclick="makeDetailCall('Make','${item["Make"]}')" href="#">${item["Make"]}</a></td>
                        <td><a onclick="makeDetailCall('Model','${item["Model"]}')" href="#">${item["Model"]}</a></td>
                        <td>${item["Engine"]}</td>
                        <td>${item['source']}</td>
                        <td><a onclick="partNumberDetailCall('mw','${item['mw']}',null,'')" href="#">${item['mw']}</a></td>
                    </tr>
        `).join('');
        results.innerHTML = rows;

        try {
            $('#resultsApplication').DataTable({
                autoWidth: false, scrollX: true
            });
            $("#resultsApplication_length > label > select").val("10").change();
        } catch (e) {
            $("#resultsApplication_length > label > select").val("10").change();
        }

        // Stop loading
        submitButton.disabled = false; // Enable the button
        spinner.style.display = 'none'; // Hide the spinner
    })

});

async function searchInterchange(oem_part, oem_name, part_type) {
    if (part_type === "" && oem_part === "" && oem_name === "") {
        return [];
    }
    let data;
    if (part_type === "Valves") {
        if (oem_name === "") {
            if (oem_part === "") {
                let {data: data1, error} = await _supabase.rpc('get_interchange_with_part_type_valves2');
                data = data1
            } else {
                let {data: data1, error} = await _supabase.rpc('get_interchange_with_oem_part', {param1: oem_part});
                data = data1
            }
        } else {
            if (oem_part === "") {
                let {data: data1, error} = await _supabase.rpc('get_interchange_valves', {col_name: oem_name});
                data = data1
            } else {
                let {data: data1, error} = await _supabase.rpc('get_interchange_with_oem_part', {param1: oem_part});
                for (const data1Element in data1) {
                    if (data1[data1Element]['oemname']!==oem_name){
                        delete data1[data1Element]
                        console.log(data1,data1[data1Element]['oemname'],oem_name)
                    }
                    console.log(data1,data1[data1Element]['oemname'],oem_name)
                }
                data = data1

            }
        }
    } else if (part_type === "Valve Seat") {
        if (oem_name === "") {
            if (oem_part === "") {
                let {data: data1, error} = await _supabase.rpc('get_interchange_with_part_type_valves3');
                data = data1
            } else {
                let {data: data1, error} = await _supabase.rpc('get_interchange_with_oem_part2', {param1: oem_part});
                data = data1
            }
        } else {
            if (oem_part === "") {
                let {data: data1, error} = await _supabase.rpc('get_interchange_valve_seat', {col_name: oem_name});
                data = data1
            } else {
                let {data: data1, error} = await _supabase.rpc('get_interchange_with_oem_part2', {param1: oem_part});
                for (const data1Element in data1) {
                    if (data1[data1Element]['oemname']!==oem_name){
                        data1.slice(data1Element,1)
                        delete data1[data1Element]
                        console.log(data1,data1[data1Element]['oemname'],oem_name)
                    }
                    console.log(data1,data1[data1Element]['oemname'],oem_name)
                }
                data = data1

            }
        }
    } else if (part_type === "") {
        if (oem_part !== "") {
            let {data: data1, error: error1} = await _supabase.rpc('get_interchange_with_oem_part', {param1: oem_part});
            let {data: data2, error: error2} = await _supabase.rpc('get_interchange_with_oem_part2', {param1: oem_part});
            for (const data1Element in data1) {
                if (data1[data1Element]['oemname']!==oem_name){
                    data1.slice(data1Element,1)
                    delete data1[data1Element]
                    console.log(data1,data1[data1Element]['oemname'],oem_name)
                }
                console.log(data1,data1[data1Element]['oemname'],oem_name)
            }
            for (const data2Element in data2) {
                if (data2[data2Element]['oemname']!==oem_name){
                    data2.slice(data2Element,1)
                    delete data2[data2Element]
                    console.log(data2,data2[data2Element]['oemname'],oem_name)
                }
                console.log(data2,data2[data2Element]['oemname'],oem_name)
            }

            data = data1.concat(data2)
        } else if (oem_name !== "") {
            let {data: data1, error} = await _supabase.rpc('get_interchange_bool', {col_name: oem_name});
            data = data1
        }
    }
    if ($.fn.DataTable.isDataTable('#makeDetailTable')) {
        $('#resultsInterchange').DataTable().clear().destroy();
    }
    const results = document.getElementById("resultsInterchangeBody");
    results.innerHTML = data.map(item => `
    <tr>
    <td>${oem_name != '' ? oem_name : item['oemname']}</td>
    <td>${item['col']}</td>
    <td><a onclick="partNumberDetailCall('mw', '${item['mw']}', null, '')" href="#">${item['mw']}</a></td>
    <td>${item['partType'] ?? item['parttype']}</td>
    <td>${item['note'] || item['Type'] || ''}</td>
    </tr>`).join('');
    try {
        $('#resultsInterchange').DataTable({
            autoWidth: false, scrollX: true
        });
        $("#resultsInterchange_length > label > select").val("10").change();
    } catch (e) {
        $("#resultsInterchange_length > label > select").val("10").change();
    }
}

document.getElementById("interchangeForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const oem_part = this.oem_part.value.trim();
    const oem_name = this.oem_name.value.trim();
    const part_type = this.part_type.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (oem_name === "" && oem_part === "") {
        event.preventDefault();
        errorMessage.textContent = "OEM part or OEM name at least one must be filled"
        return
    }


    // Start loading
    const submitButton = this.querySelector("input[type='submit']");
    const spinner = this.querySelector(".spinner-border");

    submitButton.disabled = true; // Disable the button
    spinner.style.display = 'inline-block'; // Show the spinner

    await searchInterchange(oem_part, oem_name, part_type);

    // Stop loading
    submitButton.disabled = false; // Enable the button
    spinner.style.display = 'none'; // Hide the spinner


});
document.getElementById("specification-part-type").addEventListener("change", function (event) {
    const part = document.getElementById("specification-part-type");
    const part2 = document.getElementById("specification-specification-type");
    if (part.value === "Valve Seat") {
        part2.innerHTML = `
        <option value=""></option>
        <option value="id_part">I.D.</option>
        <option value="exact_od">Exact O.D</option>
        <option value="depth">Depth</option>
        <option value="seat_angle">Seat Angle</option>
        <option value="id_top_taper">I.D. Top Taper</option>
        <option value="od">O.D.</option>
        `;
    } else if (part.value === "Valves") {
        part2.innerHTML = `
        <option value=""></option>
        <option value="chrome_or_nitrided">Chrome or Nitrated</option>
        <option value="head_diameter">Head Diameter</option>
        <option value="length">Length</option>
        <option value="angle">Seat Angle</option>
        <option value="stem_diameter">Stem Diameter</option>
        <option value="stem_type">Stem Type</option>
        <option value="tip_length">Tip Length</option>
        <option value="wafer">Wafer</option>
        `;
    } else {
        part2.innerHTML = ``
    }
});
document.getElementById("specification-specification-type").addEventListener("change", function (event) {
    const part2 = document.getElementById("specification-specification-type");
    const part = document.getElementById("specification-comparison");
    switch (part2.value) {
        case "id_part":
            spesificationComparation("get_seat_valve_id_part")
            break;
        case "exact_od":
            spesificationComparation("get_seat_valve_exact_od")
            break;
        case "depth":
            spesificationComparation("get_seat_valve_depth")
            break;
        case "seat_angle":
            spesificationComparation("get_seat_valve_seat_angle")
            break;
        case "id_top_taper":
            spesificationComparation("get_seat_valve_id_top_taper")
            break;
        case "od":
            spesificationComparation("get_seat_valve_od")
            break;
        case "chrome_or_nitrided":
            spesificationComparation("get_valve_chrome_or_nitrided")
            break;
        case "head_diameter":
            spesificationComparation("get_valve_head_diameter")
            break;
        case "length":
            spesificationComparation("get_valve_length")
            break;
        case "angle":
            spesificationComparation("get_valve_angle")
            break;
        case "stem_diameter":
            spesificationComparation("get_valve_stem_diameter")
            break;
        case "stem_type":
            spesificationComparation("get_valve_stem_type")
            break;
        case "tip_lengh":
            spesificationComparation("get_valve_tip_length")
            break;
        case "wafer":
            spesificationComparation("get_valve_wafer")
            break;
    }
    if (part2.value === 'chrome_or_nitrided' || part2.value === 'stem_type' || part2.value === 'wafer') {
        part.innerHTML = `
        <option value="null">NULL</option>
        <option value="eq">=</option>
        <option value="neq">&lt;&gt;</option>
        `
    } else {
        part.innerHTML = `
        <option value="null">NULL</option>
        <option value="eq">=</option>
        <option value="neq">&lt;&gt;</option>
        <option value="gt">&gt;</option>
        <option value="egt">&gt;=</option>
        <option value="lt">&lt;</option>
        <option value="elt">&lt;=</option>
        <option value="between">Between</option>
        `
    }
});

async function spesificationComparation(rpc) {
    let {data, error: e} = await _supabase.rpc(rpc);
    const part1 = document.getElementById("spec1");
    const part2 = document.getElementById("spec2");
    part1.innerHTML = ``
    part2.innerHTML = ``
    data.map((item, i) => {
        part1.innerHTML += `<option value="${item['data']}">${item['data']}</option>`
        part2.innerHTML += `<option value="${item['data']}">${item['data']}</option>`
    })
}

document.getElementById("specification-comparison").addEventListener("change", function (event) {
    const comparison = document.getElementById("specification-comparison");
    if (comparison.value === "between") {
        document.getElementById("specification2").style.display = `block`
    }
});
document.getElementById("specificationForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const partType = document.getElementById("specification-part-type");
    const specificationType = document.getElementById("specification-specification-type");
    const comparison = document.getElementById("specification-comparison");
    const spec1 = document.getElementById("spec1");
    const spec2 = document.getElementById("spec2");
    const head = document.getElementById("headResultSpecification");
    const body = document.getElementById("bodyResultSpecification");

    // Start loading
    const submitButton = this.querySelector("input[type='submit']");
    const spinner = this.querySelector(".spinner-border");

    submitButton.disabled = true; // Disable the button
    spinner.style.display = 'inline-block'; // Show the spinner

    if ($.fn.DataTable.isDataTable('#resultSpecification')) {
        $('#resultSpecification').DataTable().clear().destroy();
    }
    let query
    if (partType.value === "Valve Seat") {
        query = _supabase
            .from('sheet2')
            .select('*')
        head.innerHTML = `
            <th>Part Number</th>
            <th>I.D.</th>
            <th>I.D. Top Taper</th>
            <th>O.D.</th>
            <th>Seat Angle</th>
            <th>Depth</th>
            <th>Seat Angle</th>
            <th>Exact O.D</th>
        `
        body.innerHTML = ``
    } else if (partType.value === "Valves") {
        query = _supabase
            .from('dimensions')
            .select('*')
        head.innerHTML = `
            <th>Part Number</th>
            <th>Chrome or Nitrated</th>
            <th>Head Diameter</th>
            <th>Length</th>
            <th>Seat Angle</th>
            <th>Stem Diameter</th>
            <th>Stem Type</th>
            <th>Tip Length</th>
            <th>Wafer</th>
            <th>Note</th>
        `
        body.innerHTML = ``
    }
    switch (comparison.value) {
        case "eq":
            query.eq(specificationType.value, spec1.value)
            break
        case "neq":
            query.neq(specificationType.value, spec1.value)
            break
        case "gt":
            query.gt(specificationType.value, spec1.value)
            break
        case "egt":
            query.gte(specificationType.value, spec1.value)
            break
        case "lt":
            query.lt(specificationType.value, spec1.value)
            break
        case "elt":
            query.lte(specificationType.value, spec1.value)
            break
        case "between":
            query.lte(specificationType.value, spec2.value).gte(specificationType.value, spec1.value)
            break
        case "null":
            query.is(specificationType.value, null)
            break
    }
    let {data, error: e} = await query
    if (partType.value === "Valve Seat") {
        body.innerHTML = data.map(item => `
                <tr>
                    <td><a onclick="partNumberDetailCall('mw','${item['mw']}',null,'')" href="#">${item['mw']}</a></td>
                    <td>${item['id_part']}</td>
                    <td>${item['id_top_taper']}</td>
                    <td>${item['od']}</td>
                    <td>${item['seat_angle']}</td>
                    <td>${item['depth']}</td>
                    <td>${item['seat_angle']}</td>
                    <td>${item['exact_od']}</td>
                </tr>
        `).join('');
    } else if (partType.value === "Valves") {
        body.innerHTML = data.map(item => `
                <tr>
                    <td><a onclick="partNumberDetailCall('mw','${item['mw']}',null,'')" href="#">${item['mw']}</a></td>
                    <th>${item['chrome_or_nitrided']}</th>
                    <th>${item['head_diameter']}</th>
                    <th>${item['length']}</th>
                    <th>${item['angle']}</th>
                    <th>${item['stem_diameter']}</th>
                    <th>${item['stem_type']}</th>
                    <th>${item['tip_length']}</th>
                    <th>${item['wafer']}</th>
                    <th>${item['note']}</th>
                </tr>
            `).join('');
    }
    try {
        $('#resultSpecification').DataTable({
            autoWidth: false, scrollX: true
        });
        $("#resultSpecification_length > label > select").val("10").change();
    } catch (e) {
        $("#resultSpecification_length > label > select").val("10").change();
    }

    // Stop loading
    submitButton.disabled = false; // Enable the button
    spinner.style.display = 'none'; // Hide the spinner
});
//make-detail
$(document).ready(function () {
    $('#makeDetailTable').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50],
        "searching": false,
        "ordering": false,
        "language": {
            "paginate": {
                "previous": "<i class='fas fa-chevron-left'></i>", "next": "<i class='fas fa-chevron-right'></i>"
            }
        }
    });
    $('#makeDetailTable_length').css("display", "none");
    $('#makeDetailTable_info').css("display", "none");
});

function makeDetailCall(key, value) {
    if (key === "Engine") {
        makeDetails(key, atob(value))
    } else {
        makeDetails(key, value)
    }
    mainTab.style.display = 'none';
    PartsDetail.style.display = 'none';
    makeDetail.style.display = 'block';
    contentPNPage.style.display = 'none';
}

async function makeDetails(key, value) {
    if ($.fn.DataTable.isDataTable('#makeDetailTable')) {
        $('#makeDetailTable').DataTable().clear().destroy();
    }
    document.getElementById('titleHeader').innerHTML = `<b>FOR ${key} <span class="text-blue">${value}</span></b>`;
    const makeBody = document.getElementById("resultsMakeDetailPage");
    const {data, error} = await _supabase.rpc('get_engine_data', {
        param1: null,
        param2: key === "Make" ? value : null,
        param3: key === "Model" ? value : null,
        param4: key === "Engine" ? value : null,
        param5: null
    });
    if (error) {
        console.error("Error fetching data:", error);
    } else {

        makeBody.innerHTML = '';

        const rows = data.map(item => `
            <tr>
                <td>${item['Year']}</td>
                <td>${item['Make']}</td>
                <td>${item['Model']}</td>
                <td>${item['Engine']}</td>
                <td>${item['source']}</td>
                <td><a onclick="partNumberDetailCall('mw','${item['mw']}',null,'')" href="#">${item['mw']}</a></td>
            </tr>
        `).join('');
        makeBody.innerHTML = rows;
        try {
            $('#makeDetailTable').DataTable({
                autoWidth: false, scrollX: true
            });
            $("#makeDetailTable_length > label > select").val("10").change();
        } catch (e) {
            $("#makeDetailTable_length > label > select").val("10").change();
        }
    }
}

// part-number-detail
function partNumberDetailCall(key, partNumber, partName, partName2) {

    mainTab.style.display = 'none';
    PartsDetail.style.display = 'none';
    makeDetail.style.display = 'none';
    contentPNPage.style.display = 'block';
    partNumberDetail(key, partNumber, partName, partName2)
}

async function partNumberDetail(key, partNumber, partName, partName2) {
    let data4;
    if (partName2 === "" || partName2 == null || partName2 === 'null') {
        if (partNumber.charAt(0) === "W") {
            partName2 = "Valve Seat";
        } else if (partNumber.charAt(0) === "M") {
            partName2 = "Valves";
        }
    }
    if (partName2 === "Valves") {
        let {data, error4} = await _supabase
            .from('cross_reference')
            .select('*')
            .eq('mw', partNumber)
        data4 = data
    } else {
        let {data, error4} = await _supabase
            .from('master')
            .select('*')
            .eq('mw', partNumber)
        data4 = data
    }
    document.getElementById("labelPartnumberDetail").innerHTML = `${partNumber} (${partName2})`
    if (data4 && data4.length > 0) {
        let label
        if (key == 'part') {
            partNumber = data4[0].mw;
            label = `${data4[0][partName]} (${partName}) Interchangeable with ${data4[0].mw} (${partName2})`;
            document.getElementById("labelPartnumberDetail").innerHTML = label
        }
    }
    key = 'mw';
    let data1
    if (partName2 === "Valves") {
        let {data, error1} = await _supabase
            .from('dimensions')
            .select('*')
            .eq(key, partNumber)
        data1 = data
    } else {
        let {data, error1} = await _supabase
            .from('sheet2')
            .select('*')
            .eq(key, partNumber)
        data1 = data
    }
    data1 = data1[0]
    const resultsSpec = document.getElementById("resultsSpec");
    resultsSpec.innerHTML = '';
    if (data1) {
        const sortedData1 = Object.fromEntries(Object.entries(data1).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)));

        Object.entries(sortedData1).forEach(([key, value]) => {
            const row1 = document.createElement('tr');
            if (key !== "note1" && key !== "note2" && key !== "sbi" && key !== "mw") {
                row1.innerHTML = `
                        <td>${key.replaceAll('_', ' ').toUpperCase()}</td>
                        <td>${value}</td>
                        <td>${(value * 25.4).toFixed(2) == 'NaN' ? '' : (value * 25.4).toFixed(2)}</td>
                    `;
            }
            resultsSpec.appendChild(row1);
        });
    }
    let data2
    if (partName2 === "Valves") {
        let {data, error2} = await _supabase
            .from('engines_valves')
            .select('*')
            .eq(key, partNumber)
        data2 = data
    } else {
        let {data, error2} = await _supabase
            .from('engines')
            .select('*')
            .eq(key, partNumber)
        data2 = data
    }
    const resultsApp = document.getElementById("resultsApp");
    resultsApp.innerHTML = '';
    if (data2) {
        data2.forEach(item2 => {
            const row2 = document.createElement('tr');
            const linkMake = item2['Make']
            const linkModel = item2['Model']
            const linkEngine = btoa(item2['Engine'])
            row2.innerHTML = `
                            <td>${item2["Year"]}</td>
                            <td><a onclick="makeDetailCall('Make','${linkMake}')" href="#">${item2["Make"]}</a></td>
                            <td><a onclick="makeDetailCall('Model','${linkModel}')" href="#">${item2["Model"]}</a></td>
                            <td><a onclick="makeDetailCall('Engine','${linkEngine}')" href="#">${item2["Engine"]}</a></td>
                            </td><td><a onclick="partAppPartDetailCall('${linkEngine}','${partName2}','${linkMake}')" href="#"><i class="fa-solid fa-play"></i></a></td>`;
            resultsApp.appendChild(row2);
        });
    }
    let data3
    if (partName2 === "Valves") {
        let {data, error3} = await _supabase
            .from('cross_reference')
            .select('*')
            .eq(key, partNumber)
        let temp3 = {};
        for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
                if (data[i][key]) {
                    if (temp3[key]) {
                        if (!Array.isArray(temp3[key])) {
                            temp3[key] = [temp3[key]];
                        }
                        if (!temp3[key].includes(data[i][key])) {
                            temp3[key].push(data[i][key]);
                        }
                    } else {
                        temp3[key] = data[i][key];
                    }
                }
            }
        }
        data3 = temp3;
    } else {
        let {data, error3} = await _supabase
            .from('master')
            .select('*')
            .eq(key, partNumber)
        data3 = data[0];
    }
    const resultsInter = document.getElementById("resultsInter");
    resultsInter.innerHTML = '';
    if (data3) {
        Object.entries(data3).forEach(([key, value]) => {
            if (value && key !== "id" && key !== "mw" && key !== "O.D." && key !== "I.D." && key !== "I.D. Top Taper" && key !== "Depth" && key !== "Seat Angle" && key !== "Exact O.D." && key !== "Description") { // Check if value is non-empty
                const row3 = document.createElement('tr');
                row3.innerHTML = `<td>${key}</td><td>${key === "Part Number" ? `${value}` : key === "mw" ? `<a onclick="partNumberDetailCall('mw','${value}',null,'')" href="#">${value}</a>` : value}</td>`;
                resultsInter.appendChild(row3);
            }
        });
    }
}

$(document).ready(function () {
    $('#popupButton').click(function () {
        $('#popupDecimal').toggle();
    });
    $('.popup-close-btn').click(function () {
        $('#popupDecimal').hide();
    });
});
//parts-detail
$(document).ready(function () {
    $('#partDetailTable').DataTable({
        "paging": true,
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50],
        "searching": false,
        "ordering": false,
        "language": {
            "paginate": {
                "previous": "<i class='fas fa-chevron-left'></i>", "next": "<i class='fas fa-chevron-right'></i>"
            }
        }
    });
});

function partAppPartDetailCall(engines, partType, make) {
    partAppPartDetail(atob(engines), partType, make)
    mainTab.style.display = 'none';
    PartsDetail.style.display = 'block';
    makeDetail.style.display = 'none';
    contentPNPage.style.display = 'none';
}

async function partAppPartDetail(engines, partType, make) {
    let data3;
    document.getElementById('labelMakeName').innerHTML = make
    document.getElementById('labelMakeEngine').innerHTML = engines

    if (partType === "Valves") {
        let {data, error3} = await _supabase
            .from('engines_valves')
            .select('*')
            .eq('Engine', engines)
        data3 = data
    } else {
        let {data, error3} = await _supabase
            .from('engines')
            .select('*')
            .eq('Engine', engines)
        data3 = data
    }
    const body = document.getElementById('resultsPartDetail')
    body.innerHTML = ''
    if ($.fn.DataTable.isDataTable('#partDetailTable')) {
        $('#partDetailTable').DataTable().clear().destroy();
    }
    data3.map((item, i) => {
        body.innerHTML += `
                                    <tr>
                                    <td>${partType}</td>
                                    <td><a onclick="partNumberDetailCall('mw','${item['mw']}',null,'${partType}')" href="#">${item["mw"]}</a></td>
                                    <td>${item["Type"] ?? ''}</td>
                                    </tr>
                                    `;
    })
    try {
        $('#partDetailTable').DataTable({
            autoWidth: false, scrollX: true
        });
        $("#partDetailTable_length > label > select").val("10").change();
    } catch (e) {
        $("#partDetailTable_length > label > select").val("10").change();
    }
}
