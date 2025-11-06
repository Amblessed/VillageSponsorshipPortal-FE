import React from 'react';
import DonationTable from './DonationTable';
import givingPlan from '../../data/givingPlan.json';

const GivingPlanSection = () => {
    return (
        <div className="px-4">
            <DonationTable title="📊 Phase 1: Immediate Impact" data={givingPlan.phase1} />
            <DonationTable title="📈 Phase 2: Long-Term Vision" data={givingPlan.phase2} />
        </div>
    );
};

export default GivingPlanSection;
