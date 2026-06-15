import {
 Link
}
from "react-router-dom";

function Sidebar() {

return (

<div className="w-64 h-screen bg-slate-900 text-white">

<h1 className="text-2xl font-bold p-5">

Geetai Admin

</h1>

<ul>

<li>
<Link
to="/dashboard"
className="block p-4 hover:bg-slate-700"
>
Dashboard
</Link>
</li>

<li>
<Link
to="/doctors"
className="block p-4 hover:bg-slate-700"
>
Doctors
</Link>
</li>

<li>
<Link
to="/departments"
className="block p-4 hover:bg-slate-700"
>
Departments
</Link>
</li>

<li>
<Link
to="/blogs"
className="block p-4 hover:bg-slate-700"
>
Blogs
</Link>
</li>

<li>
<Link
to="/appointments"
className="block p-4 hover:bg-slate-700"
>
Appointments
</Link>
</li>

</ul>

</div>

);
}

export default Sidebar;