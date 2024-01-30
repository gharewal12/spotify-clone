'use client';
import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';

const UploadModal = () => {

    const [isLoading, setIsLoading] = useState<boolean>();
    const uploadModal = useUploadModal();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            // Reset the form
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // Upload to supabase
    }

    return (
        <Modal
            title='Add a song'
            description='Upload a mp3 file'
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    id='title'
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
            </form>
        </Modal>
    )
}

export default UploadModal