import React from 'react';
import SideBarItem from '../components/sidebarItem/SideBarItem';

const Sidebar = () => {
    return (
        <div style={{ backgroundColor: "#ccc" }}>
            <div className="container-md pt-3 pb-3 g-0">
                <div className="row">
                    <div className="col col-3" >
                        <SideBarItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;