import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const navigatetologin = () => {
        navigate('/login');
      };

    return <section>
    <div className="container">
        <div className="row align-items-center mt-4">
            <div className="col-lg-6">
                <div className="one-side">
                    <h1 className="headddd">Manage projects <br/> in the most <br/> efficient way.</h1>
                     <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-3">
                                Simplified productivity website for all. This website is a hub for <br/> managing productivity tasks professionally and efficiently
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-lg-6 ms-auto">
                <div>
                    <img src="projectmanage.jpg" alt="" className="img-fluid" id="project-img"/>
                </div>
            </div>
        </div>
    </div>
</section>
}