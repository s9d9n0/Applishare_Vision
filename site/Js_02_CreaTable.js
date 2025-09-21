// style="width: 100px;"

function getTableVVHead() {
    const thead = document.querySelector('thead');
    tags  = `<tr>
                <th id="colVolume">
                    <div class="placementVolume">
                        <div>Volume</div>
                        <div><input type="text" id="volume" 
                                placeholder="recherche..." title="rech sur volume"
                                onfocusin="focusInColonne('volume')"
                                onfocusout="focusOutColonne('volume')" 
                                onkeyup="filtreColonne('MaTableVV','volume',0)">
                        </div>
                    </div>
                    <div class="fleche">
                        <a class="asc0" onclick="sortESSAI_Table('MaTableVV','asc',0)">&#x25b4;</a>
                        <a class="desc0" onclick="sortESSAI_Table('MaTableVV','desc',0)">&#x25be;</a>
                    </div>
                </th>

                <th onclick="sortTable('MaTableVV',1)">Env.</th>
                <th onclick="sortTable('MaTableVV',2)">Quartier</th>
                <th onclick="sortTable('MaTableVV',3)">DC</th>
                <th onclick="sortTable('MaTableVV',4)">Zone</th>
                <th onclick="sortTable('MaTableVV',5)">Type</th>

                <th id="colApplication">
                    <div class="placementApplication">
                        <div>Application</div>
                        <div><input type="text" id="application"
                                placeholder="recherche..." title="rech sur application"
                                onfocusin="focusInColonne('application')"
                                onfocusout="focusOutColonne('application')" 
                                onkeyup="filtreColonne('MaTableVV','application',6)">
                        </div>
                    </div>
                    <div class="fleche">
                        <a class="asc6" onclick="sortESSAI_Table('MaTableVV','asc',6)">&#x25b4;</a>
                        <a class="desc6" onclick="sortESSAI_Table('MaTableVV','desc',6)">&#x25be;</a>
                    </div>
                </th>

                <th onclick="sortTable('MaTableVV',7)">Quota VV <br/> <span>(en GB)</span></th>
                <th onclick="sortTable('MaTableVV',8)">Niv. d'utilisation <br/> <span>(en GB)</span></th>

                <th id="colUsePrct">
                    <div>Niv. d'utilisation </br> <span>(en %)</span></div>
                    <div class="fleche">
                        <a class="asc9" onclick="sortESSAI_Table('MaTableVV','asc',9)">&#x25b4;</a>
                        <a class="desc9" onclick="sortESSAI_Table('MaTableVV','desc',9)">&#x25be;</a>
                    </div>
                </th>

            </tr>`
    thead.innerHTML = tags;
}



function getTableVVBody(DataRef){
    const tbody = document.querySelector('tbody');
    let tags = "";
    DataRef.map((d,index) =>{
        tags += `<tr>
            <td style="text-align:center;">${d.Volume}</td>
            <td style="text-align:center;">${d.env}</td>
            <td style="text-align:center;">${d.quartier}</td>
            <td style="text-align:center;">${d.dc}</td>
            <td style="text-align:center;">${d.zone}</td>
            <td style="text-align:center;">${d.type}</td>
            <td>${d.Application}</td>
            <td>${parseFloat(d.Cap)}</td>
            <td>${parseFloat(d.Use)}</td>`

            if (d['UsePrct']<30){
                tags += `<td style="background-image: linear-gradient(to right, #00FF00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=30 && d['UsePrct']<40){
                tags += `<td style="background-image: linear-gradient(to right, #20F900 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=40 && d['UsePrct']<50){
                tags += `<td style="background-image: linear-gradient(to right, #40F300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=50 && d['UsePrct']<60){
                tags += `<td style="background-image: linear-gradient(to right, #80E600 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=60 && d['UsePrct']<70){
                tags += `<td style="background-image: linear-gradient(to right, #C0D900 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=70 && d['UsePrct']<80){
                tags += `<td style="background-image: linear-gradient(to right, #E0D300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=80 && d['UsePrct']<90){
                tags += `<td style="background-image: linear-gradient(to right, #F0D000 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=90 && d['UsePrct']<92){
                tags += `<td style="background-image: linear-gradient(to right, #FFCC00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=92 && d['UsePrct']<94){
                tags += `<td style="background-image: linear-gradient(to right, #FF9F00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=94 && d['UsePrct']<96){
                tags += `<td style="background-image: linear-gradient(to right, #FF7100 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=96 && d['UsePrct']<98){
                tags += `<td style="background-image: linear-gradient(to right, #FF4300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=98){
                tags += `<td style="background-image: linear-gradient(to right, #FF1500 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}

        tags += `</tr>`
    })
    tbody.innerHTML = tags;
}



// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################



function getTableFSHead() {
    const thead = document.querySelector('thead');
    tags  = `<tr>
                <th id="colVolume">
                    <div class="placementVolume">
                        <div>Volume</div>
                        <div><input type="text" id="volume" 
                                placeholder="recherche..." title="rech sur volume"
                                onfocusin="focusInColonne('volume')"
                                onfocusout="focusOutColonne('volume')" 
                                onkeyup="filtreColonne('MaTableFS','volume',0)">
                        </div>
                    </div>
                    <div class="fleche">
                        <a class="asc0" onclick="sortESSAI_Table('MaTableFS','asc',0)">&#x25b4;</a>
                        <a class="desc0" onclick="sortESSAI_Table('MaTableFS','desc',0)">&#x25be;</a>
                    </div>
                </th>

                <th onclick="sortTable('MaTableFS',1)">Env.</th>
                <th onclick="sortTable('MaTableFS',2)">Quartier</th>
                <th onclick="sortTable('MaTableFS',3)">DC</th>
                <th onclick="sortTable('MaTableFS',4)">Zone</th>
                <th onclick="sortTable('MaTableFS',5)">Type</th>

                <th onclick="sortTable('MaTableFS',6)">Quota FS <br/> <span>(en GB)</span></th>
                <th onclick="sortTable('MaTableFS',7)">Niv. d'utilisation <br/> <span>(en GB)</span></th>

                <th id="colUsePrct">
                    <div>Niv. d'utilisation </br> <span>(en %)</span></div>
                    <div class="fleche">
                        <a class="asc8" onclick="sortESSAI_Table('MaTableFS','asc',8)">&#x25b4;</a>
                        <a class="desc8" onclick="sortESSAI_Table('MaTableFS','desc',8)">&#x25be;</a>
                    </div>
                </th>

            </tr>`
    thead.innerHTML = tags;
}



function getTableFSBody(DataRef){
    const tbody = document.querySelector('tbody');
    let tags = "";
    DataRef.map((d,index) =>{
        tags += `<tr>
            <td style="text-align:center;">${d.Volume}</td>
            <td style="text-align:center;">${d.env}</td>
            <td style="text-align:center;">${d.quartier}</td>
            <td style="text-align:center;">${d.dc}</td>
            <td style="text-align:center;">${d.zone}</td>
            <td style="text-align:center;">${d.type}</td>
            <td>${parseFloat(d.CapFS)}</td>
            <td>${parseFloat(d.UseFS)}</td>`

            if (d['UsePrct']<30){
                tags += `<td style="background-image: linear-gradient(to right, #00FF00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=30 && d['UsePrct']<40){
                tags += `<td style="background-image: linear-gradient(to right, #20F900 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=40 && d['UsePrct']<50){
                tags += `<td style="background-image: linear-gradient(to right, #40F300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=50 && d['UsePrct']<60){
                tags += `<td style="background-image: linear-gradient(to right, #80E600 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=60 && d['UsePrct']<70){
                tags += `<td style="background-image: linear-gradient(to right, #C0D900 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=70 && d['UsePrct']<80){
                tags += `<td style="background-image: linear-gradient(to right, #E0D300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=80 && d['UsePrct']<90){
                tags += `<td style="background-image: linear-gradient(to right, #F0D000 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=90 && d['UsePrct']<92){
                tags += `<td style="background-image: linear-gradient(to right, #FFCC00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=92 && d['UsePrct']<94){
                tags += `<td style="background-image: linear-gradient(to right, #FF9F00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=94 && d['UsePrct']<96){
                tags += `<td style="background-image: linear-gradient(to right, #FF7100 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=96 && d['UsePrct']<98){
                tags += `<td style="background-image: linear-gradient(to right, #FF4300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=98){
                tags += `<td style="background-image: linear-gradient(to right, #FF1500 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}

        tags += `</tr>`
    })
    tbody.innerHTML = tags;
}

