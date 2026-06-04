import { useNavigate } from "react-router-dom";

const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const settingDivStyle = "p-4 border rounded-md hover:scale-95 transition-all duration-200 cursor-pointer bg-slate-500"
    return (
        <div className="flex flex-col gap-2 p-4 border rounded-sm m-4 w-md ">

            <div
                onClick={() => navigate(`changepassword/${user.id}`)}
                className={settingDivStyle}>
                Change Password
            </div>
        </div>
    )
}

export default MyAccount;