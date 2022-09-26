import { singlePackage } from "../../interfaces/assetTypes"
import { useGearQuery } from "../../redux/sanityApi";
import '../../styles/gear.scss';

export const Gear = () => {

    const { data, isSuccess } = useGearQuery();

    const renderGear = () => {
        if (isSuccess) {
            return data.map((cameraPackage:singlePackage) => (
                <ul key={`package-ul-${cameraPackage._id}`}className="camera-package">
                    <h3 className="camera-package-title">
                        {cameraPackage.name}
                    </h3>
                    {cameraPackage.features.map((feature,index) => 
                        <li key={`${cameraPackage._id}-feature-${index}`}>{feature}</li>    
                    )}
                </ul>
            ))
        }
    }
    
    return(
        <div id="gear-container">
            <h2 id="gear-header">ANIMA's Gear</h2>
            <div id="gear-list">
                {renderGear()}
            </div>
        </div>
    )
}