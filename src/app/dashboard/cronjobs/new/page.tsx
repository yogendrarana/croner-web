import React from 'react';
import { Metadata } from 'next';
import { FormMode } from '@/const/form';
import CreateUpdateCronjob from '../_components/create-update-cronjob';

export const metadata: Metadata = {
  title: 'Create Cronjob',
  description: 'Create a new cronjob',
};

export default function NewCronjobPage() {
  return (
    <div>
      <CreateUpdateCronjob formMode={FormMode.CREATE} />
    </div>
  );
}
