'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Gauge, Edit, Plus } from 'lucide-react';


function CreateDialog({ isOpen, onOpenChange, formData, setFormData, onCreate, isLoading, createError, setCreateError }) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Mode
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Payment Mode</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (createError) setCreateError(null);
                            }}
                            placeholder="Enter payment mode name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {createError && (
                            <Label className="mb-4 text-sm text-destructive">{createError}</Label>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => {
                        setCreateError(null);
                        onOpenChange(false);
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={onCreate} disabled={isLoading}>
                        {isLoading ? <Spinner className="h-4 w-4 mr-2" /> : null}
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


function EditDialog({ isOpen, onOpenChange, formData, setFormData, onEdit, isLoading, updateError, setUpdateError }) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Payment Mode</DialogTitle>
                    <DialogDescription>Update the payment mode details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (updateError) setUpdateError(null);
                            }}
                            placeholder="Enter payment mode name"
                        />
                    </div>
                    {updateError && (
                        <Label className="mb-4 text-sm text-destructive">{updateError}</Label>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <select
                            id="edit-status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => {
                        setUpdateError(null);
                        onOpenChange(false);
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={onEdit} disabled={isLoading}>
                        {isLoading ? <Spinner className="h-4 w-4 mr-2" /> : null}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


function Filters({ query, statusFilter, setQuery, setStatusFilter }) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
                <Label htmlFor="search">Search</Label>
                <Input
                    id="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="filter-status">Status</Label>
                <select
                    id="filter-status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
    );
}


function PaymentModeCard({ mode, openEditDialog }) {
    const key = mode.id ?? mode.paymentmodeid;
    return (
        <Card key={key}>
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate pr-2 max-w-[200px]">{mode.v_paymentmodename}</CardTitle>
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            mode.v_isactive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                        {mode.v_isactive === true ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <CardDescription>Mode ID: {mode.v_paymentmodeid}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(mode)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
                {/* For Debugging Tatangalin ko din */}
                {/* <pre className="text-xs text-muted-foreground overflow-auto max-h-24 bg-muted/20 p-2 rounded break-all whitespace-pre-wrap">
                    {JSON.stringify(mode, null, 2)}
                </pre> */}
            </CardContent>
        </Card>
    );
}


export default function PaymentModePage() {
    const [paymentModes, setPaymentModes] = useState([]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isCreateLoading, setIsCreateLoading] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', status: 'Active' });
    const [isEditLoading, setIsEditLoading] = useState(false);

    //Get
    const fetchPaymentModes = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/paymentmode');
            if (!res.ok) throw new Error('Failed to fetch payment modes');
            const data = await res.json();
            const candidate = Array.isArray(data) ? data : (data?.data ?? []);
            const list = candidate.map((row) => ({
                id: row.v_paymentmodeid,
                name: row.v_paymentmodename,
                status: row.v_isactive === true ? 'Active' : 'Inactive',
                ...row,
            }));
            setPaymentModes(list);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentModes();
    }, []);

    //Post
    const handleCreate = async () => {
        if (!formData.name.trim()) {
            setCreateError('Name is required');
            return;
        }
        try {
            setCreateError(null);
            setIsCreateLoading(true);
            const res = await fetch('/api/paymentmode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name, status: formData.status }),
            });

            if (!res.ok){
                const errorData = await res.json().catch(() => ({}));
                setCreateError(errorData.details || 'Failed to create payment mode');
                return;
            }
            await fetchPaymentModes();
            setFormData({ name: '', status: 'Active' });
            setIsCreateOpen(false);
        } catch (err) {
            setCreateError(err.message || 'Failed to create');
        } finally {
            setIsCreateLoading(false);
        }
    };

    //Put
    const handleEdit = async () => {
        if (!formData.name.trim()) {
            setUpdateError('Name is required');
            return;
        }
        try {
            setUpdateError(null);
            setIsEditLoading(true);
            const id = currentItem?.v_paymentmodeid;
            if (!id) throw new Error('Missing payment mode id');
            const res = await fetch(`/api/paymentmode/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentmodename: formData.name, isactive: formData.status === 'Active' }),
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                setUpdateError(errorData.details || 'Failed to update payment mode');
                return;
            }
            await fetchPaymentModes();
            setIsEditOpen(false);
            setCurrentItem(null);
            setFormData({ name: '', status: 'Active' });
        } catch (err) {
            setUpdateError(err.message || 'Failed to update');
        } finally {
            setIsEditLoading(false);
        }
    };
    //Dialog
    const openEditDialog = (item) => {
        const paymentModeId = item.v_paymentmodeid;
        const name = item.v_paymentmodename;
        const status = (item.v_isactive === true) ? 'Active' : 'Inactive';
        setCurrentItem({ ...item, paymentmodeid: paymentModeId });
        setFormData({ name, status });
        setIsEditOpen(true);
    };

    //Filter
    const filteredModes = paymentModes.filter((m) => {
        const name = m.v_paymentmodename;
        const matchesQuery = (name + ' ').toLowerCase().includes(query.toLowerCase());
        const status = m.v_isactive === true ? 'Active' : 'Inactive';
        const matchesStatus = statusFilter === 'All' ? true : status === statusFilter;
        return matchesQuery && matchesStatus;
    });

    return (
        <div className="header-space mx-auto max-w-7xl">
            <div className="px-4">
                <Button className="mb-4 my-4" onClick={() => window.history.back()}>
                    <Gauge className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>

            <div className="container mx-auto px-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-2xl">Payment Modes</CardTitle>
                                <CardDescription>Manage your payment methods</CardDescription>
                            </div>
                            <CreateDialog
                                isOpen={isCreateOpen}
                                onOpenChange={setIsCreateOpen}
                                formData={formData}
                                setFormData={setFormData}
                                onCreate={handleCreate}
                                isLoading={isCreateLoading}
                                createError={createError}
                                setCreateError={setCreateError}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 text-sm text-destructive">{error}</div>
                        )}

                        <Filters
                            query={query}
                            statusFilter={statusFilter}
                            setQuery={setQuery}
                            setStatusFilter={setStatusFilter}
                        />

                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <Spinner className="h-8 w-8" />
                            </div>
                        ) : (
                            <>
                                {filteredModes.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-6">
                                        No payment modes found. Add one to get started.
                                    </div>
                                ) : (
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {filteredModes.map((mode) => (
                                            <PaymentModeCard key={mode.id ?? mode.paymentmodeid} mode={mode} openEditDialog={openEditDialog} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>

                <EditDialog
                    isOpen={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    formData={formData}
                    setFormData={setFormData}
                    onEdit={handleEdit}
                    isLoading={isEditLoading}
                    updateError={updateError}
                    setUpdateError={setUpdateError}
                />
            </div>
        </div>
    );
}