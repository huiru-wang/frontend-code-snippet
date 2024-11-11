import '../App.css'


interface FormDataProps {
    username: string;
    email: string;
    onChange: (data: { username: string, email: string }) => void;
}

export const Form: React.FC<FormDataProps> = ({ username, email, onChange }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // name是对应的input的key
        // value是对应的修改的值
        const { name, value } = e.target;

        // 结构对象，并放入key-value，覆盖原有的key-value
        onChange({ ...{ username, email }, [name]: value });

        // Object.assign({}, {key, value}) ： 将传入的对象和已有的对象合并，并返回合并后的对象
        // onChange(Object.assign({ username, email }, { [name]: value }));
    };

    return (
        <div className="card">
            <form>
                <div>
                    <label>username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name='username'
                        required
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>eamil</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        required
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <p>{username} / {email}</p>
        </div>
    )

}