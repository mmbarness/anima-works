import { allGear } from "../assets/gearInfo"
import { singlePackage } from "../interfaces/assetTypes"
import '../styles/gear.scss'

export const gear = () => {

    const renderPackage = (cameraPackage: singlePackage) => (
        <ul className="camera-package">
            <h3 className="camera-package-title">
                {cameraPackage.packageName}
            </h3>
            {cameraPackage.features.map(feature => 
                <li>{feature}</li>    
            )}
        </ul>
    )
    return(
        <div id="gear-container">
            <h2 id="gear-header">ANIMA's Gear</h2>
            <div id="gear-list">
                {allGear.map((cameraPackage)=> 
                    renderPackage(cameraPackage.package)
                )}
            </div>
        </div>
    )
}