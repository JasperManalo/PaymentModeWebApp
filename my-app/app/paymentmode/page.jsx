'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function PaymentModePage() {
    const [paymentModes, setPaymentModes] = useState([]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });

    useEffect(() => {
        setTimeout(() => {
            setPaymentModes([
                { id: 1, name: 'Credit Card', description: 'Pay using credit card', status: 'Active' },
                { id: 2, name: 'PayPal', description: 'Pay using PayPal account', status: 'Active' },
                { id: 3, name: 'Bank Transfer', description: 'Direct bank transfer', status: 'Inactive' },
            ]);
            setIsLoading(false);
        }, 1500);
    }, []);

    const handleCreate = () => {
        const newItem = {
            id: paymentModes.length + 1,
            ...formData
        };
        setPaymentModes([...paymentModes, newItem]);
        setFormData({ name: '', description: '', status: 'Active' });
        setIsCreateOpen(false);
    };

    const handleEdit = () => {
        setPaymentModes(paymentModes.map(item => 
            item.id === currentItem.id ? { ...currentItem, ...formData } : item
        ));
        setIsEditOpen(false);
        setCurrentItem(null);
        setFormData({ name: '', description: '', status: 'Active' });
    };

    const handleDelete = () => {
        setPaymentModes(paymentModes.filter(item => item.id !== currentItem.id));
        setIsDeleteOpen(false);
        setCurrentItem(null);
    };

    const openEditDialog = (item) => {
        setCurrentItem(item);
        setFormData({ name: item.name, description: item.description, status: item.status });
        setIsEditOpen(true);
    };

    const openDeleteDialog = (item) => {
        setCurrentItem(item);
        setIsDeleteOpen(true);
    };

    return (
        <div className="header-space mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-6 text-center py-10">Payment Modes Management</h1>
            
        <div className="container mx-auto py-8 px-4">
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
                                    <Button onClick={handleCreate}>Create</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search & Filters */}
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                            <Label htmlFor="search">Search</Label>
                            <Input
                                id="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name or description"
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
                                            const matchesQuery = (m.name + ' ' + (m.description ?? '')).toLowerCase().includes(query.toLowerCase());
                                            const matchesStatus = statusFilter === 'All' ? true : m.status === statusFilter;
                                            return matchesQuery && matchesStatus;
                                        })
                                        .map((mode) => (
                                        <Card key={mode.id}>
                                            <CardHeader className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">{mode.name}</CardTitle>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                            mode.status === 'Active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {mode.status}
                                                    </span>
                                                </div>
                                                <CardDescription>Mode ID: {mode.id}</CardDescription>
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
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openDeleteDialog(mode)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        ))}
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
                        <Button onClick={handleEdit}>Save Changes</Button>
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
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        </div>
    );
}