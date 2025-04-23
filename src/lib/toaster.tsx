import toast from 'react-hot-toast';

export const toasterMessage = (message: string, emoji: string) => toast.custom(
    <div className="flex gap-3 bg-white text-black p-4 rounded-full border border-gray-200 shadow-lg min-w-80 toast-enter toast-enter-active">
        <div className="flex justify-center items-center bg-slate-100 w-11 h-11 rounded-full">
            {emoji}
        </div>
        <div className="flex justify-center items-center">
            <p className="text">{message}</p>
        </div>
    </div>
);