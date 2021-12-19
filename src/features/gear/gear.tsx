import { useEffect } from "react";
import { singlePackage } from "../../interfaces/assetTypes"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import '../../styles/gear.scss';
import { fetchGear } from "../../utils/sanityRequests";
import { fetchGearAction } from "./gearSlice";

export const Gear = () => {

    const dispatch = useAppDispatch();
    const {gear, LOADING} = useAppSelector(state => state.gearSlice);

    useEffect(() => {
        dispatch(fetchGearAction());
    },[])

    const renderGear = () => {
        if (LOADING) {
            return 'loading...'
        } else {
            return gear.map((cameraPackage:singlePackage) => (
                <ul className="camera-package">
                    <h3 className="camera-package-title">
                        {cameraPackage.name}
                    </h3>
                    {cameraPackage.features.map(feature => 
                        <li>{feature}</li>    
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