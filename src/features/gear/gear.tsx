import { useEffect } from "react";
import { singlePackage } from "../../interfaces/assetTypes"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useGearQuery } from "../../redux/sanityApi";
import '../../styles/gear.scss';
import { fetchGearAction } from "./gearSlice";

export const Gear = () => {

    const dispatch = useAppDispatch();
    const {gear, LOADED} = useAppSelector(state => state.gearSlice);

    const { data } = useGearQuery();

    useEffect(() => {
        dispatch(fetchGearAction());
    },[dispatch])

    const renderGear = () => {
        if (LOADED) {
            return gear.map((cameraPackage:singlePackage) => (
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