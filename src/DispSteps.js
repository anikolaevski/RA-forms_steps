import React, {useState} from 'react';
// import shortid from 'shortid';

const workSteps = [];
// [{
//   // id: shortid.generate(),
//   date: GetFormattedDate(new Date()),
//   distance: "10"
// }];

export function DispSteps() {
  const [steps, setSteps] = useState({items: workSteps});

  // console.log(steps);
  const onSubmit = (evt) => {
    evt.preventDefault();
  // eslint-disable-next-line no-undef
  const sdat = document.querySelector('#step-input-date');
  // eslint-disable-next-line no-undef
  const sdis = document.querySelector('#step-input-distance');
    if (!sdat || !sdis) { return; }
    const sd = formatTableDate(sdat.value);
    const sdd = sdis.value;
    if (!sd || !sdd) { return; }
    const rec = workSteps.find(o => o.date === sd);
    if (rec) {
      rec.distance = (parseInt(rec.distance,10) + parseInt(sdd,10)).toString();
      setSteps( () => ({items: workSteps}));
    } else {
      workSteps.push({
        // id: shortid.generate(),
        date: sd,
        distance: sdd
      });
      workSteps.sort((a,b) => {
        const adate = formatInputDate(a.date);
        const bdate = formatInputDate(b.date);
        return (bdate > adate)? 1 : -1;
      });
      setSteps(() => ({items: workSteps}));
    }
    // console.log('workSteps =',workSteps, 'steps =', steps);
  }

  return (
    <div className="step-list">
      <h2>Учёт тренировок</h2>
      <form>
      {/* onSubmit={onSubmit} */}
        <table className="step-table">
          <thead>
            <tr>
              <th className="step-table-header">Дата</th>
              <th className="step-table-header">Пройдено км</th>
              <th></th>            
            </tr>
            <tr>
              <td className="step-table-cell"><input id="step-input-date" className="step-border" type="date" name="date"></input></td>
              <td className="step-table-cell"><input id="step-input-distance" className="step-border" type="text" name="distance"></input></td>
              <td className="step-table-cell"><button className="step-border" onClick={onSubmit}>Ok</button></td>
            </tr>
            <tr>
              <th className="step-table-header">Дата<br/><br/></th>
              <th className="step-table-header">Пройдено км<br/><br/></th>
              <th className="step-table-header">Действия<br/><br/></th>
            </tr>
          </thead>
          <tbody className="step-border">
            {steps.items.map( o => <DispStep key={o.date} item={o} setSteps={setSteps}/>)}
          </tbody>
        </table>
      </form>
    </div>
  );
}

function DispStep(prop) {
  // console.log(prop);
  const EditRec = (evt) => {
    const el = evt.target.parentNode.parentNode.parentNode;
    if (!el) { return; }
    const row = workSteps.find(o => o.date === prop.item.date);
    // console.log(el.getAttribute('data-id'), row);
    if (!row) { return; }
  // eslint-disable-next-line no-undef
    const sdat = document.querySelector('#step-input-date');
  // eslint-disable-next-line no-undef
  const sdis = document.querySelector('#step-input-distance');
    if (!sdat || !sdis) { return; }
    sdat.value = formatInputDate(row.date);
    sdis.value = row.distance;
  };
  const DelRec = (evt) => {
    const el = evt.target.parentNode.parentNode.parentNode;
    if (!el) { return; }
    const key = workSteps.findIndex(o => o.date === el.getAttribute('data-id'));
    if (key == -1) { return; }
    workSteps.splice(key,1);
    // console.log(workSteps);
    prop.setSteps(() => ({items: workSteps}));
  };
  return (
    <tr data-id={prop.item.date}>
      <td className="step-table-cell">{prop.item.date}</td>
      <td className="step-table-cell">{prop.item.distance}</td>
      <td className="step-table-cell">
        <span><i className="fas fa-pencil-alt" onClick={EditRec} title="Редактировать"></i></span>
        <span><i className="fas fa-times" onClick={DelRec} title="Удалить"></i></span>
      </td>
    </tr>
  );
}

// function GetFormattedDate(dat) {
//   const dd = dat.getDate();
//   const mm = (dat.getMonth() + 101).toString().substring(1, 3);
//   // eslint-disable-next-line prefer-template
//   return [(dd < 10 ? `0${dd}` : dd), mm, dat.getFullYear()].join('.');
// }

// string date --> into input format
function formatInputDate(str) {
  const ar = str.split('.');
  return (`${ar[2]}-${ar[1]}-${ar[0]}`);
}

// string date --> into disp format
function formatTableDate(inpStr) {
  const ar = inpStr.split('-');
  return (`${ar[2]}.${ar[1]}.${ar[0]}`);
}

