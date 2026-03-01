  // Configurações (altere aqui se desejar outra regra)
  const hoje = new Date();
  const referencia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()); // data de referência de hoje
  const referenciaPedagio = new Date(2021, 11, 31);
  const inclusiveDeduction = true; // se true, conta o último dia do período de dedução (fim - inicio + 1)
  const DAYS_IN_YEAR = 365;
  const DAYS_IN_MONTH = 30.41;

  // Helpers de DOM
  const $ = id => document.getElementById(id);
  const tabelaAcrBody = document.querySelector('#tabelaAcr tbody');
  const tabelaCompFeriasBody = document.querySelector('#tabelaCompFerias tbody');
  const tabelaCompLicBody = document.querySelector('#tabelaCompLic tbody');
  const tabelaDedBody = document.querySelector('#tabelaDed tbody');
  const dataInclusaoInput = $('dataInclusao');
  const saida = $('saida');
  const saida2 = $('saida2');
  const totalDiasEl = $('totalDias');
  const convTempoEl = $('convTempo');
  const efetivoServicoEl = $('efetivoServico');
  const atividadeMilitarEl = $('atividadeMilitar');
  const averbacaoCivilEl = $('averbacaoCivil');
  const computacaoEl = $('computacao');
  const deducoesEl = $('deducoes');
  const promocaoOuReservaEl = $('promocaoOuReserva');
  const detalhesEl = $('detalhes');

  function limpaData(dateString) {
  const [ano, mes, dia] = dateString.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
  }

  function criaLinhaAcr(tipo='', dataBOL='', dias='') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><select value="${tipo}" style="width:99.5%">
          <option value="" disabled selected hidden>Selecione aqui a averbação</option>
          <option value="Tempo de atividade militar (FFAA, Polícia Militar ou Bombeiro Militar)">Tempo de atividade militar (FFAA, Polícia Militar ou Bombeiro Militar)</option>
          <option value="Tempo de serviço público em regime próprio">Tempo de serviço público em regime próprio</option>
          <option value="Tempo de serviço com contribuição ao INSS">Tempo de serviço com contribuição ao INSS</option>
        </select>
      </td>
      <td><input type="number" min="0" step="1" value="${dias}" style="width:85%"></td>
      <td><input type="date" value="${dataBOL}" style="width:85%"></td>
      <td><button class="btn ghost" data-action="rem">Rem</button></td>
    `;
    tr.querySelector('[data-action="rem"]').addEventListener('click', ()=> tr.remove());
    tabelaAcrBody.appendChild(tr);
  }

  function criaLinhaCompFerias(exercicio='', dataBOL='') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><select value="${exercicio}" style="width:99.5%">
            <option value="" disabled selected hidden>Selecione aqui a o exercício das férias</option>
            <option value="1980">1980</option>
            <option value="1981">1981</option>
            <option value="1982">1982</option>
            <option value="1983">1983</option>
            <option value="1984">1984</option>
            <option value="1985">1985</option>
            <option value="1986">1986</option>
            <option value="1987">1987</option>
            <option value="1988">1988</option>
            <option value="1989">1989</option>
            <option value="1990">1990</option>
            <option value="1991">1991</option>
            <option value="1992">1992</option>
            <option value="1993">1993</option>
            <option value="1994">1994</option>
            <option value="1995">1995</option>
            <option value="1996">1996</option>
            <option value="1997">1997</option>
            <option value="1998">1998</option>
          </select>
      </td>
      <td><input type="date" value="${dataBOL}" style="width:85%"></td>
      <td><button class="btn ghost" data-action="rem">Rem</button></td>
    `;
    tr.querySelector('[data-action="rem"]').addEventListener('click', ()=> tr.remove());
    tabelaCompFeriasBody.appendChild(tr);
  }

  function criaLinhaCompLic(decenio='', mesesComputados='', dataBOL='') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><select value="${decenio}" style="width:99.5%">
            <option value="" disabled selected hidden>Selecione aqui o decênio</option>
            <option value="1º decênio">1º decênio</option>
            <option value="2º decênio">2º decênio</option>
            <option value="3º decênio">3º decênio</option>
            <option value="4º decênio">4º decênio</option>
          </select>
      </td>
      <td><select value="${mesesComputados}" style="width:99.5%">
            <option value="" disabled selected hidden>Selecione aqui a quantidade de meses</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
      </td>
      <td><input type="date" value="${dataBOL}" style="width:85%"></td>
      <td><button class="btn ghost" data-action="rem">Rem</button></td>
    `;
    tr.querySelector('[data-action="rem"]').addEventListener('click', ()=> tr.remove());
    tabelaCompLicBody.appendChild(tr);
  }

  function criaLinhaDed(tipo='', inicio='', fim='') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <select value="${tipo}" style="width:99.5%">
          <option value="" disabled selected hidden>Selecione aqui a dedução</option>
          <option value="Condenação transitada em julgado">Condenação transitada em julgado</option>
          <option value="Exclusão">Exclusão</option>
          <option value="Deserção">Deserção</option>
          <option value="Licença para tratar interesse particular">Licença para tratar interesse particular</option>
          <option value="Ultrapassar 1 ano de lic. para tratar pessoa da família">Ultrapassar 1 ano de lic. para tratar pessoa da família</option>
          <option value="Perda da graduação">Perda da graduação</option>
          <option value="Outros">Outros</option>
        </select>
      </td>
      <td><input type="date" value="${inicio}" style="width:85%"></td>
      <td><input type="date" value="${fim}" style="width:85%"></td>
      <td class="dias">0</td>
      <td><button class="btn ghost" data-action="rem">Rem</button></td>
    `;
    tr.querySelector('[data-action="rem"]').addEventListener('click', ()=> tr.remove());
    // atualizar dias ao mudar as datas
    const datas = tr.querySelectorAll('input[type="date"]');
    const inicioInput = datas[0];
    const fimInput = datas[1];
    function atualizaDias() {
      const i = inicioInput.value ? limpaData(inicioInput.value) : null;
      const f = fimInput.value ? limpaData(fimInput.value) : null;
      if (i && f) {
        const diffMs = f.getTime() - i.getTime();
        let dias = Math.round(diffMs / (24*60*60*1000));
        if (inclusiveDeduction) dias = dias + 1;
        tr.querySelector('.dias').textContent = (dias >= 0 ? dias : 0);
      } else {
        tr.querySelector('.dias').textContent = '0';
      }
    }
    inicioInput.addEventListener('change', atualizaDias);
    fimInput.addEventListener('change', atualizaDias);
    tabelaDedBody.appendChild(tr);
  }

  // eventos de adicionar
  $('addAcr').addEventListener('click', ()=> criaLinhaAcr());
  $('addDed').addEventListener('click', ()=> criaLinhaDed());
  $('addCompFerias').addEventListener('click', ()=> criaLinhaCompFerias());
  $('addCompLic').addEventListener('click', ()=> criaLinhaCompLic());


 
  // calcular diferença em dias entre duas datas (referencia - inclusao)
  function diasEntre(inicio, fim) {
    // inicio, fim: Date objects
    const tIni = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate()).getTime();
    const tFim = new Date(fim.getFullYear(), fim.getMonth(), fim.getDate()).getTime();
    const diff = tFim - tIni;
    return Math.floor(diff / (24*60*60*1000)) + 1;
  }

  function converterDias(totalDias) {
  const anos = Math.floor(totalDias / DAYS_IN_YEAR);

  let rem = totalDias - (anos * DAYS_IN_YEAR);

  const meses = Math.floor(rem / DAYS_IN_MONTH);

  const dias = Math.floor(rem - (meses * DAYS_IN_MONTH));

  return { anos, meses, dias };
  }

  function plural (num) {
    
    let verificar = true;
    
    if (num < 2) {
        verificar = false;
    }

    return verificar

  }

  function anoMesEDia(numero, unidade) {
    if (unidade === "anos") return plural(numero) ? "anos" : "ano";
    if (unidade === "meses") return plural(numero) ? "meses" : "mês";
    if (unidade === "dias") return plural(numero) ? "dias" : "dia";
    return "erro";
  }


  function separaAverbacao(dias, data) { //separa as averbações antes e depois do dia 31/12/2021, para calcular pedágio

    let resultado = {
      antesreferencia: 0,
      depoisreferencia: 0
    };

    const marco = new Date(2021, 11, 31);
    const dataAverbacao = limpaData(data);

    if (dataAverbacao <= marco) {
      resultado.antesreferencia += dias;
    } else {
      resultado.depoisreferencia += dias;
    }

    return resultado;
  }

  function separaDedução(inicioDedução, fimDedução) { //separa as deduções antes e depois do dia 31/12/2021, para calcular pedágio

    let resultado = {
      antesreferencia: 0,
      depoisreferencia: 0
    };

    const marco = new Date(2021, 11, 31);
    const diaSeguinteMarco = new Date(2022, 0, 1);
    const inicio = limpaData(inicioDedução);
    const fim = limpaData(fimDedução);

    if (inicio > fim) {
      alert('A data inicial da dedução deve ser menor que a data final!');
      return resultado;
    }

    if (inicio <= marco && fim > marco) { // função para separar os dias de dedução antes de 31/12/2021
      
      let diasDedIni = diasEntre(inicio, marco);
      resultado.antesreferencia += diasDedIni;

    } else  if (inicio <= marco && fim <= marco){

      let diasDedIni = diasEntre(inicio, fim);
      resultado.antesreferencia += diasDedIni;
    }


    if (inicio <= marco && fim > marco) { // função para separar os dias de dedução após 31/12/2021
      
      let diasDedFim = diasEntre(diaSeguinteMarco, fim)
      resultado.depoisreferencia += diasDedFim;
 
    } else  if (inicio > marco && fim > marco){

      let diasDedFim = diasEntre(inicio, fim);
      resultado.depoisreferencia += diasDedFim;
    }

    return resultado;
  }

  $('calcular').addEventListener('click', ()=> {
    // validações
    if (!dataInclusaoInput.value) {
      alert('Preencha a Data de inclusão.');
      return;
    }

    //abaixo ele faz a leitura do tipo de cálculo selecionado, após clicar para calcular.
    const tipoSelecionado = document.querySelector('input[name="tipoCalculo"]:checked').value;

    const inclusao = limpaData(dataInclusaoInput.value);
    // dia inicial para contar = data de inclusão
    // queremos tempo bruto = referencia - inclusao (em dias), assumindo exclusão do dia inicial
    
    let diasBrutos = diasEntre(inclusao, referencia);
    if (isNaN(diasBrutos) || diasBrutos < 0) diasBrutos = 0;

    // soma averbação
    let somaAcrAntes = 0;
    let somaAcrDepois = 0;
    let somaAcr = 0;
    let somaMilitarAntes = 0;
    let somaMilitarDepois = 0;
    let somaMilitar = 0;
    Array.from(tabelaAcrBody.querySelectorAll('tr')).forEach(tr=>{
      const tipoInput = tr.querySelector('select');
      const diasInput = tr.querySelector('input[type="number"]');
      const dataInput = tr.querySelector('input[type="date"]').value;
      const val = parseInt(diasInput.value || '0',10);
      if (!isNaN(val) && val>0) {
        
        if (tipoInput.value === "Tempo de atividade militar (FFAA, Polícia Militar ou Bombeiro Militar)") {

          somaMilitarAntes += separaAverbacao(val, dataInput).antesreferencia;
          somaMilitarDepois += separaAverbacao(val, dataInput).depoisreferencia;
          somaMilitar += val;
        }

        somaAcrAntes += separaAverbacao(val, dataInput).antesreferencia;
        somaAcrDepois += separaAverbacao(val, dataInput).depoisreferencia;
        somaAcr += val;
      }
    });
    const somaAcrCivil = somaAcr - somaMilitar;

//Soma as computações em dobro de férias
    let somaCompFerias = 0;
    let somaCompFeriasAntes = 0;
    let somaCompFeriasDepois = 0;
    Array.from(tabelaCompFeriasBody.querySelectorAll('tr')).forEach(tr=>{
      const anoCompFerias = tr.querySelector('select').value;
      const dataInputCompFerias = tr.querySelector('input[type="date"]').value;

      if (anoCompFerias) {somaCompFerias += 60;};
      if (separaAverbacao(anoCompFerias, dataInputCompFerias).antesreferencia > 0) {somaCompFeriasAntes += 60;}
      if (separaAverbacao(anoCompFerias, dataInputCompFerias).depoisreferencia > 0) {somaCompFeriasDepois += 60;}

    });

//Soma as computações em dobro de licença especial
    let somaCompLic = 0;
    let somaCompLicAntes = 0;
    let somaCompLicDepois = 0;
    Array.from(tabelaCompLicBody.querySelectorAll('tr')).forEach(tr=>{
      const mesesCompLic = parseInt(tr.querySelectorAll('select')[1].value || '0', 10);
      const dataInputCompLic = tr.querySelector('input[type="date"]').value;

      if (mesesCompLic) {somaCompLic += (mesesCompLic * 60);};
      if (separaAverbacao(mesesCompLic, dataInputCompLic).antesreferencia > 0) {somaCompLicAntes += (mesesCompLic * 60);};
      if (separaAverbacao(mesesCompLic, dataInputCompLic).depoisreferencia > 0) {somaCompLicDepois += (mesesCompLic * 60);};

    }); 
    const somaCompTotal = somaCompFerias + somaCompLic;

    // soma deduções (já calculadas na coluna dias)
    let somaDed = 0;
    let somaDedAntes = 0;
    let somaDedDepois = 0;
    const detalhes = [];
    Array.from(tabelaDedBody.querySelectorAll('tr')).forEach(tr=>{
      const tipo = tr.querySelector('select').value || 'Dedução';
      const inicioVal = tr.querySelectorAll('input[type="date"]')[0].value;
      const fimVal = tr.querySelectorAll('input[type="date"]')[1].value;
      const dias = parseInt(tr.querySelector('.dias').textContent || '0',10);
      if (!isNaN(dias) && dias>0) {
        somaDedAntes += separaDedução(inicioVal, fimVal).antesreferencia;
        somaDedDepois += separaDedução(inicioVal, fimVal).depoisreferencia;
        somaDed += dias;

        detalhes.push({ tipo, inicio: inicioVal, fim: fimVal, dias });
      } else if (inicioVal || fimVal) {
        detalhes.push({ tipo, inicio: inicioVal, fim: fimVal, dias: 0 });
      }

    });

    //Definindo os resultados de acréscimos
    const somaAcrTotal = somaAcr + somaCompFerias + somaCompLic;
    const somaAcrTotalAntes = somaAcrAntes + somaCompFeriasAntes + somaCompLicAntes;
    const somaAcrTotalDepois = somaAcrDepois + somaCompFeriasDepois + somaCompLicDepois;

    const efetivoServico = diasBrutos - somaDed;
    const somaMilitarTotal = efetivoServico + somaMilitar;
    const totalDias = Math.max(0, efetivoServico + somaAcrTotal);

    const conv = converterDias(totalDias); // converte o tempo de serviço total em ano, mês e dia


    //Abaixo calcula o tempo necessário para a promoção:

    let tempoFaltante30Anos = 0; //define o tempo faltante para completar os 30 anos de efetivo serviço
    if (efetivoServico < 10950) {tempoFaltante30Anos += 10950 - efetivoServico}

    const diasAntesPedagio = (diasEntre(inclusao, referenciaPedagio) - somaDedAntes + somaAcrTotal);
    // calcula o tempo restante entre a data de inclusão e 31/12/2021, para cacular o pedágio
    
    let calculoPedagio = 0; // variável para acresentar o tempo faltante (diasAntesPedagio) mais os 17%

    if (diasAntesPedagio >= 10950) {calculoPedagio = 0}
    else if ((Math.ceil((10950 - diasAntesPedagio) * 1.17) + somaDedDepois) <= 0) {calculoPedagio = 0}
    else {calculoPedagio = Math.ceil((10950 - diasAntesPedagio) * 1.17) + somaDedDepois}

    
    const tempoPedagio = diasAntesPedagio + calculoPedagio; // define o tempo total de serviço com o pedágio

    // abaixo se define a data que o militar atinge o tempo de serviço necessário para a inatividade (1º critério)
    const databasePedagio = new Date(inclusao.getFullYear(), inclusao.getMonth(), inclusao.getDate());
    if (calculoPedagio === 0){databasePedagio.setDate(databasePedagio.getDate() - somaAcrTotal + somaDed + 10950 - 1);}
    else {databasePedagio.setDate(databasePedagio.getDate() - somaAcrTotal + somaDed + tempoPedagio - 1);}
    const dataPedagio  = new Date(databasePedagio.getFullYear(), databasePedagio.getMonth(), databasePedagio.getDate());

    let tempoFaltantePedagio = 0; // define quanto tempo falta para atingir o pedágio de 17%
    if (tempoPedagio > totalDias) {tempoFaltantePedagio = tempoPedagio - totalDias}

    const database30Anos = new Date(inclusao.getFullYear(), inclusao.getMonth(), inclusao.getDate()); // define a data que o militar completa 30 anos de efetivo serviço
    database30Anos.setDate(database30Anos.getDate() + 10950 + somaDed - 1);
    const data30Anos = new Date(database30Anos.getFullYear(), database30Anos.getMonth(), database30Anos.getDate());

    let tempoPromocao = 10950 + somaAcrTotal; // define o tempo em que o militar está apto para a promoção
    if (dataPedagio > data30Anos) {tempoPromocao = tempoPedagio}

    const tempoFaltantePromocao = Math.max(tempoFaltante30Anos, tempoFaltantePedagio); // define quantos dias faltam para a promoção

    //Abaixo define a data definitiva em que o militar possui o direito à promoção
    const dataBaseProm = new Date(inclusao.getFullYear(), inclusao.getMonth(), inclusao.getDate());
    dataBaseProm.setDate(dataBaseProm.getDate() - somaAcrTotal + somaDed + tempoPromocao - 1);
    const dataPromocao = new Date(dataBaseProm.getFullYear(), dataBaseProm.getMonth(), dataBaseProm.getDate());
    

    // calcular o tempo necessário para a inatividade:

    //abaixo verifica se o militar tem ou não pedágio
    const calculoVerificadorPedagio = diasEntre(inclusao, referenciaPedagio) - somaDedAntes + somaAcrTotalAntes;
    let temPedagio = true;
    if (calculoVerificadorPedagio >= 10950) {temPedagio = false}


    //OBS: O PRIMEIRO CRITÉRIO DE PEDÁGIO JÁ É CALCULADO NA PROMOÇÃO, COM AS VARIÁVEIS diasAntesPedagio, calculoPedagio e tempoFaltantePedagio.

    //cálculo para tempo de atividade militar:
    
    let tempoAte30anos = diasEntre(referenciaPedagio, inclusao) - somaAcrTotal + 10950 + somaDed - 2; // verifica o tempo, de 01/01/2022 até 30 anos
    if (tempoAte30anos <= 0) tempoAte30anos = 0;
    let mesesAcrescentar = Math.floor(tempoAte30anos / 365) * 4; //verifica os meses a acrescentar no pedágio de atividade militar
    if (mesesAcrescentar > 60) {mesesAcrescentar = 60};
    const anoAtividadeMilitar = Math.floor(mesesAcrescentar / 12) + 25; // calcula os anos de pedágio de atividade militar
    let mesAtividadeMilitar = mesesAcrescentar - ((anoAtividadeMilitar - 25) * 12); // calcula os meses de pedágio de ativ. militar
    if (anoAtividadeMilitar >= 30) {mesAtividadeMilitar = 0}
    const diaAtividadeMilitar = 0; // os dias de pedágio de atividade militar serão sempre 0

    //abaixo converte os anos, meses e dias de atividade militar em total de dias.
    let tempoAtividadeMilitar = (anoAtividadeMilitar * 365) + Math.floor(mesAtividadeMilitar * 30.41);
    let tempoFaltanteAtividadeMilitar = tempoAtividadeMilitar - somaMilitarTotal;
    if (somaMilitarTotal >= tempoAtividadeMilitar) {tempoFaltanteAtividadeMilitar = 0}

    //abaixo compara o pedágio com atividade militar para verificar o tempo maior e definir o tempo para a reserva remunerada com pedágio:
    let tempoTotalPedagio = (tempoPedagio - totalDias > tempoAtividadeMilitar - somaMilitarTotal) ? tempoPedagio : (totalDias + tempoAtividadeMilitar - somaMilitarTotal);
    let tempoFaltanteTotalPedagio = (totalDias >= tempoTotalPedagio) ? 0 : tempoTotalPedagio - totalDias;

    // abaixo verifica se o militar tem ou não pedágio para definir seu tempo para a reserva remunerada:
    let tempoReserva = (temPedagio) ? tempoTotalPedagio : 10950;
    let tempoFaltanteReserva = (totalDias >= tempoReserva) ? 0 : (tempoReserva - totalDias);

    const dataBaseRes = new Date(inclusao.getFullYear(), inclusao.getMonth(), inclusao.getDate());
    dataBaseRes.setDate(dataBaseRes.getDate() - somaAcrTotal + tempoReserva + somaDed - 1);
    const dataReserva = new Date(dataBaseRes.getFullYear(), dataBaseRes.getMonth(), dataBaseRes.getDate());


    //Abaixo se define o tempo de serviço para quem entrou a partir de 16/12/2019
    const tempoNovo = 12775; //35 anos de serviço
    let tempoFaltanteNovo = (totalDias > tempoNovo) ? 0 : (tempoNovo - totalDias);
    const tempoMilitarNovo = 10950; //30 anos de atividade militar
    let tempoFaltanteMilitarNovo = (somaMilitarTotal > tempoMilitarNovo) ? 0 : (tempoMilitarNovo - somaMilitarTotal);
    
    let tempoReservaNovo = ((tempoNovo - totalDias) > (tempoMilitarNovo - somaMilitarTotal)) ? tempoNovo : (totalDias + tempoMilitarNovo - somaMilitarTotal);
    let tempoFaltanteReservaNovo = (totalDias >= tempoReservaNovo) ? 0 : (tempoReservaNovo - totalDias);

    const dataBaseResNovo = new Date(inclusao.getFullYear(), inclusao.getMonth(), inclusao.getDate());
    dataBaseResNovo.setDate(dataBaseResNovo.getDate() - somaAcrTotal + tempoReservaNovo + somaDed - 1);
    const dataReservaNovo = new Date(dataBaseResNovo.getFullYear(), dataBaseResNovo.getMonth(), dataBaseResNovo.getDate());

    //abaixo calcula os critérios de promoção para exibição:
    const convPromocao = converterDias(tempoPromocao);
    const convFaltantePromocao = converterDias(tempoFaltantePromocao);
    function calculaPromocao(){
      promocaoOuReservaEl.className = 'bloco ativo promocao';
      promocaoOuReservaEl.innerHTML = 
       `
        <p></p>
        <div class="titulo-calculo";"><strong>Cálculo do tempo necessário para a promoção: </strong></div>
        <p></p>
        
        <div class="muted" style="margin-top:6px;">Cálculo do 1º critério: 30 anos de efetivo serviço na PMPB (10950 dias)</div>
        <div class="resumo">
          <div class="resumo-item"><b>Tempo de efetivo serviço na PMPB: </b> ${efetivoServico} ${anoMesEDia(efetivoServico, "dias")};</div>
          <div class="resumo-item"><b>Tempo faltante para 30 anos de efetivo serviço na PMPB: </b>${tempoFaltante30Anos} ${anoMesEDia(tempoFaltante30Anos, "dias")};</div>
          <div class="resumo-item"><b>Data que completa os 30 anos de efetivo serviço na PMPB: </b>${data30Anos.toLocaleDateString('pt-BR')}.</div>
        </div>
        <p></p>
        <div class="muted" style="margin-top:6px;">Cálculo do 2º critério: 30 anos de serviço mais os 17% do pedágio</div>
        
        <div class="resumo">
          <div class="resumo-item"><b>Tempo de serviço até 31/12/2021 mais acréscimos e deduções: </b>${diasAntesPedagio} ${anoMesEDia(diasAntesPedagio, "dias")};</div>
          <div class="resumo-item"><b>Tempo restante, de 01/01/2022 para 30 anos de serviço, mais os 17% do pedágio: </b>${calculoPedagio} ${anoMesEDia(calculoPedagio, "dias")};</div>
          <div class="resumo-item"><b>Data que completa os 30 anos de serviço mais os 17% do pedágio: </b>${dataPedagio.toLocaleDateString('pt-BR')}.</div>
        </div>
        <p></p>
        <p></p>
        
        <div class="resumo">
          <div class="resumo-item" style="font-size: 20px;"><b>Tempo total necessário para a promoção (contabilizando acréscimos e deduções): </b>${tempoPromocao} ${anoMesEDia(tempoPromocao, "dias")}
            (${convPromocao.anos} ${anoMesEDia(convPromocao.anos, "anos")}, ${convPromocao.meses} ${anoMesEDia(convPromocao.meses, "meses")}, e ${convPromocao.dias} ${anoMesEDia(convPromocao.dias, "dias")});</div>
        </div>

        <div class="resumo">
          <div class="resumo-item" style="font-size: 20px;"><b>Tempo faltante: </b>${tempoFaltantePromocao} ${anoMesEDia(tempoFaltantePromocao, "dias")}
            (${convFaltantePromocao.anos} ${anoMesEDia(convFaltantePromocao.anos, "anos")}, ${convFaltantePromocao.meses} ${anoMesEDia(convFaltantePromocao.meses, "meses")}, e ${convFaltantePromocao.dias} ${anoMesEDia(convFaltantePromocao.dias, "dias")});</div>
        </div>

        <div class="resumo">
          <div class="resumo-item" style="font-size: 20px;"><b>Data para estar apto à promoção: </b>${dataPromocao.toLocaleDateString('pt-BR')}.</div>
        </div>
       `
    }

    //abaixo calcula os critérios de reserva remunerada para exibição:
    const convReserva = converterDias(tempoReserva);
    const convFaltanteReserva = converterDias(tempoFaltanteReserva);
    const convReservaNovo = converterDias(tempoReservaNovo);
    const convFaltanteReservaNovo = converterDias(tempoFaltanteReservaNovo);
    function calculaReserva(){
      promocaoOuReservaEl.className = 'bloco ativo reserva';

      //abaixo define a exibição para quem possui o direito de ir pela lei anterior
      
      if (temPedagio === false) {promocaoOuReservaEl.innerHTML =
        `
          <p></p>
            <div class="titulo-calculo";"><strong>Cálculo do tempo necessário para a reserva: </strong></div>
          <p></p>
            <div>Militar possui o direito adquirido de ser transferido para a reserva remunerada com base na legislação anterior (30 anos de serviço)</div>
          <p></p>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo de serviço até 31/12/2021 mais acréscimos e deduções: </b>${diasAntesPedagio} ${anoMesEDia(diasAntesPedagio, "dias")}</div>
          </div>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo necessário para ser transferido para a reserva remunerada: </b>10950 dias</div>
          </div>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo faltante para a reserva remunerada a pedido: </b> 0 dia</div>
          </div>
        `
      }

      else if (temPedagio && inclusao <= new Date(2019, 11, 16)) {promocaoOuReservaEl.innerHTML = 
        `
          <p></p>
            <div class="titulo-calculo";"><strong>Cálculo do tempo necessário para a reserva: </strong></div>
          <p></p>

          <div class="muted" style="margin-top:6px;">Cálculo do 1º critério: 30 anos de serviço mais os 17% do pedágio</div>
          <div class="resumo">
            <div class="resumo-item"><b>Tempo de serviço até 31/12/2021 mais acréscimos e deduções: </b>${diasAntesPedagio} ${anoMesEDia(diasAntesPedagio, "dias")}</div>
            <div class="resumo-item"><b>Tempo restante, de 01/01/2022 para 30 anos de serviço, mais os 17% do pedágio: </b>${calculoPedagio} ${anoMesEDia(calculoPedagio, "dias")}</div>
            <div class="resumo-item"><b>Tempo total para 30 anos de serviço, mais os 17% do pedágio: </b>${tempoPedagio} ${anoMesEDia(tempoPedagio, "dias")}</div>
          </div>
          <p></p>

          <div class="muted" style="margin-top:6px;">Cálculo do 2º critério: tempo mínimo de atividade militar</div>
          <div class="resumo">
            <div class="resumo-item"><b>Tempo de serviço de 01/01/2022 até 30 anos: </b>${tempoAte30anos} ${anoMesEDia(tempoAte30anos, "dias")}</div>
            <div class="resumo-item"><b>Meses a acrescentar para o pedágio de atividade militar: </b>${mesesAcrescentar} ${anoMesEDia(mesesAcrescentar, "meses")}</div>
            <div class="resumo-item"><b>Tempo total para atividade militar: </b>${tempoAtividadeMilitar} ${anoMesEDia(tempoAtividadeMilitar, "dias")}</div>
          </div>
          <p></p>
          <p></p>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo total necessário para a reserva remunerada (contabilizando acréscimos e deduções): </b>${tempoReserva} ${anoMesEDia(tempoReserva, "dias")}
              (${convReserva.anos} ${anoMesEDia(convReserva.anos, "anos")}, ${convReserva.meses} ${anoMesEDia(convReserva.meses, "meses")}, e ${convReserva.dias} ${anoMesEDia(convReserva.dias, "dias")})</div>
          </div>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo faltante: </b>${tempoFaltanteReserva} ${anoMesEDia(tempoFaltanteReserva, "dias")}
              (${convFaltanteReserva.anos} ${anoMesEDia(convFaltanteReserva.anos, "anos")}, ${convFaltanteReserva.meses} ${anoMesEDia(convFaltanteReserva.meses, "meses")}, e ${convFaltanteReserva.dias} ${anoMesEDia(convFaltanteReserva.dias, "dias")})</div>
          </div>
        
          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Data para estar apto à transferência para a reserva remunerada: </b>${dataReserva.toLocaleDateString('pt-BR')}</div>
          </div>
        `
      }

      else {promocaoOuReservaEl.innerHTML = 
        `
          <p></p>
            <div class="titulo-calculo";"><strong>Cálculo do tempo necessário para a reserva: </strong></div>
          <p></p>

          <div class="muted" style="margin-top:6px;">Cálculo do 1º critério: 35 anos de serviço</div>
          <div class="resumo">
            <div class="resumo-item"><b>Tempo de serviço total: </b>${totalDias} ${anoMesEDia(totalDias, "dias")}</div>
            <div class="resumo-item"><b>Tempo restante para 35 anos de serviço: </b>${tempoFaltanteNovo} ${anoMesEDia(tempoFaltanteNovo, "dias")}</div>
          </div>
          <p></p>

          <div class="muted" style="margin-top:6px;">Cálculo do 2º critério: 30 anos de atividade militar</div>
          <div class="resumo">
            <div class="resumo-item"><b>Tempo de atividade militar: </b>${tempoAtividadeMilitar} ${anoMesEDia(tempoAtividadeMilitar, "dias")}</div>
            <div class="resumo-item"><b>Tempo faltante para os 30 anos de atividade militar: </b>${tempoFaltanteMilitarNovo} ${anoMesEDia(tempoFaltanteMilitarNovo, "meses")}</div>
          </div>
          <p></p>
          <p></p>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo total necessário para a reserva remunerada (contabilizando acréscimos e deduções): </b>${tempoReservaNovo} ${anoMesEDia(tempoReservaNovo, "dias")}
              (${convReservaNovo.anos} ${anoMesEDia(convReservaNovo.anos, "anos")}, ${convReservaNovo.meses} ${anoMesEDia(convReservaNovo.meses, "meses")}, e ${convReservaNovo.dias} ${anoMesEDia(convReservaNovo.dias, "dias")})</div>
          </div>

          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Tempo faltante: </b>${tempoFaltanteReservaNovo} ${anoMesEDia(tempoFaltanteReservaNovo, "dias")}
              (${convFaltanteReservaNovo.anos} ${anoMesEDia(convFaltanteReservaNovo.anos, "anos")}, ${convFaltanteReservaNovo.meses} ${anoMesEDia(convFaltanteReservaNovo.meses, "meses")}, e ${convFaltanteReservaNovo.dias} ${anoMesEDia(convFaltanteReservaNovo.dias, "dias")})</div>
          </div>
        
          <div class="resumo">
            <div class="resumo-item" style="font-size: 20px;"><b>Data para estar apto à transferência para a reserva remunerada: </b>${dataReservaNovo.toLocaleDateString('pt-BR')}</div>
          </div>
       `
      }
    }


    // Abaixo mostra o código para exibir na página:
    totalDiasEl.textContent = totalDias + " " + anoMesEDia(totalDias, "dias");
    convTempoEl.textContent = `${conv.anos} ${anoMesEDia(conv.anos, "anos")}, ${conv.meses} ${anoMesEDia(conv.meses, "meses")}, e ${conv.dias} ${anoMesEDia(conv.dias, "dias")}.`;
    efetivoServicoEl.textContent = efetivoServico + " " + anoMesEDia(efetivoServico, "dias");
    atividadeMilitarEl.textContent = somaMilitarTotal + " " + anoMesEDia(somaMilitarTotal, "dias");
    averbacaoCivilEl.textContent = somaAcrCivil + " " + anoMesEDia(somaAcrCivil, "dias");
    computacaoEl.textContent = somaCompTotal + " " + anoMesEDia(somaCompTotal, "dias");
    deducoesEl.textContent = somaDed + " " + anoMesEDia(somaDed, "dias");

    if(tipoSelecionado === 'promocao') {calculaPromocao()}
    else if (tipoSelecionado === 'reserva') {calculaReserva()}

    detalhesEl.innerHTML = '';
    const li6 = document.createElement('li');
    li6.textContent = `Tempo para a promoção (dias): ${tempoPromocao}. Tempo restante para a promoção: ${tempoFaltantePromocao}. Data para a promoção: ${dataPromocao.toLocaleDateString('pt-BR')}.`;
    detalhesEl.appendChild(li6);
    const li7 = document.createElement('li');
    li7.textContent = `Tempo para a reserva remunerda (dias): ${tempoReserva}. Tempo restante para a reserva: ${tempoFaltanteReserva}. Data para a reserva: ${dataReserva.toLocaleDateString('pt-BR')}.`;
    detalhesEl.appendChild(li7);

    if (detalhes.length) {
      const title = document.createElement('li');
      title.textContent = 'Períodos deduzidos:';
      detalhesEl.appendChild(title);
      detalhes.forEach(d=>{
        const li = document.createElement('li');
        li.textContent = `${d.tipo} — ${d.inicio || '-'} → ${d.fim || '-'} : ${d.dias} dias`;
        detalhesEl.appendChild(li);
      });
    }
    saida.classList.add('ativo');
    saida2.classList.add('ativo');

    setTimeout(() => {
      saida.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

  });

  document.querySelectorAll('input[name="tipoCalculo"]').forEach(radio => {
    radio.addEventListener('change', () => {

      // só recalcula se já houver resultado visível
      if (saida.classList.contains('ativo')) {
        document.getElementById('calcular').click();
      }

    });
  });

  $('limpar').addEventListener('click', ()=> {
    dataInclusaoInput.value = '';
    tabelaAcrBody.innerHTML = '';
    tabelaDedBody.innerHTML = '';
    saida.classList.remove('ativo');
    saida2.classList.remove('ativo');
    cabeça = $('cabeça');
    cabeça.scrollIntoView({behavior:'smooth'});
    criaLinhaAcr();
    criaLinhaDed();
  });

  // preenche com 1 linha vazia para facilitar
  criaLinhaAcr();
  criaLinhaDed();
  criaLinhaCompFerias();
  criaLinhaCompLic();

  if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
  }

  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });