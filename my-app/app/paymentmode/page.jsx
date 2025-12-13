'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Gauge, Edit, Plus } from 'lucide-react';

export default function PaymentModePage() {
    const [paymentModes, setPaymentModes] = useState([]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', status: 'Active' });

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

    const handleCreate = async () => {
        try {
            setError(null);
            const res = await fetch('/api/paymentmode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name, status: formData.status }),
            });
            if (!res.ok) throw new Error('Failed to create payment mode');
            const created = await res.json();
            const createdRow = created?.data ?? created;
            const normalized = {
                id: createdRow?.v_paymentmodeid,
                name: createdRow?.v_paymentmodename,
                status: createdRow?.v_isactive === true ? 'Active' : 'Inactive',
                ...createdRow,
            };
            await fetchPaymentModes();
            setFormData({ name: '', description: '', status: 'Active' });
            setIsCreateOpen(false);
        } catch (err) {
            setError(err.message || 'Failed to create');
        }
    };

    const handleEdit = async () => {
        try {
            setError(null);
            const id = currentItem?.v_paymentmodeid;
            if (!id) throw new Error('Missing payment mode id');
            const res = await fetch(`/api/paymentmode/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentmodename: formData.name, isactive: formData.status === 'Active' }),
            });
            if (!res.ok) throw new Error('Failed to update payment mode');
            const updated = await res.json();

            await fetchPaymentModes();
            setIsEditOpen(false);
            setCurrentItem(null);
            setFormData({ name: '', status: 'Active' });
        } catch (err) {
            setError(err.message || 'Failed to update');
        }
    };


    const openEditDialog = (item) => {
        const paymentModeId = item.v_paymentmodeid;
        const name = item.v_paymentmodename;
        const status = (item.v_isactive === true) ? 'Active' : 'Inactive';
        
        setCurrentItem({ ...item, paymentmodeid: paymentModeId });
        setFormData({ name, status });
        setIsEditOpen(true);
    };

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
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Payment Mode
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Payment Mode</DialogTitle>
                                    <DialogDescription>
                                        Add a new payment mode to your system
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreate}>
                                        Create</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                    {/* Search & Filters Yessurrrrrrrrrrrrrrrrrrrrrrrrrr*/}
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
                    {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <Spinner className="h-8 w-8" />
                        </div>
                    ) : (
                        <>
                            {paymentModes.length === 0 ? (
                                <div className="text-center text-muted-foreground py-6">
                                    No payment modes found. Add one to get started.
                                </div>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {paymentModes
                                        .filter((m) => {
                                            const name = m.v_paymentmodename;
                                            const matchesQuery = (name + ' ').toLowerCase().includes(query.toLowerCase());
                                            const status = m.status ?? ((m.v_isactive === true) ? 'Active' : 'Inactive');
                                            const matchesStatus = statusFilter === 'All' ? true : status === statusFilter;
                                            return matchesQuery && matchesStatus;
                                        })
                                        .map((mode) => {
                                            const key = mode.id ?? mode.paymentmodeid;
                                            return (
                                        <Card key={key}>
                                            <CardHeader className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">{mode.v_paymentmodename}</CardTitle>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                            (mode.status === 'Active' || (mode.status !== 'Inactive' && (mode.v_isactive === true || mode.isactive === true)))
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {mode.status ?? ((mode.v_isactive === true || mode.isactive === true) ? 'Active' : 'Inactive')}
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
                                                {/* For Debugging :> */}
                                                <pre className="text-xs text-muted-foreground overflow-auto max-h-24 bg-muted/20 p-2 rounded">
                                                    {JSON.stringify(mode, null, 2)}
                                                </pre>
                                            </CardContent>
                                        </Card>
                                        );
                                        })}
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Payment Mode</DialogTitle>
                        <DialogDescription>
                            Update the payment mode details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter payment mode name"
                            />
                        </div>
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
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEdit}>
                            Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Payment Mode</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this payment mode?
                        </DialogDescription>
                    </DialogHeader>
                    {currentItem && (
                        <div className="py-4">
                            <p className="text-sm">
                                You are about to delete: <strong>{currentItem.name}</strong>
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        </div>
    );
}