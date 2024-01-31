const csvFilePath = 'winter2023dates.csv';
const outputContainer = document.getElementById('upcoming-deadlines');
const assignments = [];


async function readCSVFile() {
   
    try {
      const response = await fetch(csvFilePath);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch the file (status ${response.status}).`);
      }
  
      const content = await response.text();

      // Parse CSV content
      const rows = content.split('\n');
      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const parsedDate = new Date(values[0])
        const assignment = {date: parsedDate, course: values[1], title: values[2], weight: values[3], week: values[4]}
        assignments.push(assignment)
      }
      //get top 5 upcoming dates
      const currentDate = new Date();
      const sortedObjects = assignments
      .filter(obj => obj.date > currentDate) // Only consider future dates
      .sort((a, b) => Math.abs(a.date - currentDate) - Math.abs(b.date - currentDate));
      const topDates =  sortedObjects.slice(0, 5)

     
      if (topDates.length > 0) {
        for (const assignment of topDates) {
          displayAssignment(assignment);
        }
      }
    } catch (error) {
      console.error('Error:', error);
  }
}
async function getDates(assignments){
    const currentDate = new Date();
    const sortedObjects = assignments
    .filter(obj => obj.date > currentDate) // Only consider future dates
    .sort((a, b) => Math.abs(a.date - currentDate) - Math.abs(b.date - currentDate));
    return sortedObjects.slice(0, 5)
}
function displayAssignment(assignment) {
  const assignmentDiv = document.createElement('div');
  stringDate = parseDate(assignment.date)
  //${assignment.date.toLocaleDateString()}
  assignmentDiv.classList.add('assignment-card');
  assignmentDiv.innerHTML = `
    <p>  ${stringDate}</p>
    <p> ${assignment.title} - ${assignment.course}</p>

  `;
  outputContainer.appendChild(assignmentDiv);
}
function parseDate(date){
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return(days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate() );
}
readCSVFile();