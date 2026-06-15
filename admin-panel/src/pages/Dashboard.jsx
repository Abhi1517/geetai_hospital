import DashboardLayout
from "../layouts/DashboardLayout";

function Dashboard(){

return (

<DashboardLayout>

<h1 className="text-4xl font-bold">

Dashboard

</h1>

<div className="grid grid-cols-4 gap-5 mt-10">

<div className="bg-white shadow p-6">

Total Doctors

</div>

<div className="bg-white shadow p-6">

Departments

</div>

<div className="bg-white shadow p-6">

Blogs

</div>

<div className="bg-white shadow p-6">

Appointments

</div>

</div>

</DashboardLayout>

);
}

export default Dashboard;