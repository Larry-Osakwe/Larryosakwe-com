import { redirect } from 'next/navigation';
import { requireAuth } from './server';
import { notFound } from 'next/navigation';

export async function protectPage() {
  try {
    return await requireAuth();
  } catch (error) {
    redirect('/login');
  }
}

export async function protectPaidPage() {
  try {
    const user = await requireAuth();
    
    if (!user.hasAccess && !user.isAdmin) {  // Admin bypass
      redirect('/pricing');
    }
    
    return user;
  } catch (error) {
    redirect('/login');
  }
}

export async function protectAdminPage() {
  try {
    const user = await requireAuth();
    
    if (!user.isAdmin) {
      notFound();
    }
    
    return user;
  } catch (error) {
    redirect('/login');
  }
}