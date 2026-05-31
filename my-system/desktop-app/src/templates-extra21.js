window.FORGE_TEMPLATES = window.FORGE_TEMPLATES || {};

Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🏥 STOMCONTROL ARCHITECTURE SCAFFOLD
// ============================================================
stomarch: {
  keywords: ['laravel', 'php laravel', 'stom arch kur', 'stom arch yap', 'stom arch oluştur', 'build stom arch', 'stom architecture', 'stom framework', 'stom arch', 'stom'],
  projectName: 'StomControl-Core',
  files: {
    'package.json': `{
  "name": "stomcontrol",
  "private": true,
  "scripts": {
    "dev": "npm run development",
    "development": "mix",
    "watch": "mix watch",
    "prod": "npm run production",
    "production": "mix --production"
  },
  "devDependencies": {
    "laravel-mix": "^6.0.6",
    "tailwindcss": "^3.0",
    "postcss": "^8.0",
    "autoprefixer": "^10.0"
  }
}`,

    'composer.json': `{
  "name": "stomcontrol/core",
  "description": "StomControl Laravel Architecture",
  "type": "project",
  "require": {
    "php": "^8.0",
    "laravel/framework": "^9.0",
    "spatie/laravel-permission": "^5.0"
  }
}`,

    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StomControl v6.0 | Professional Architecture</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/feather-icons"></script>
    <style>
        body { font-family: 'Outfit', sans-serif; background-color: #f8fafc; color: #1e293b; }
        .sidebar { background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); width: 280px; height: 100vh; position: fixed; transition: 0.3s; }
        .content-area { margin-left: 280px; padding: 2.5rem; }
        .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 1.5rem; }
        .nav-item { display: flex; align-items: center; padding: 1rem 1.5rem; color: #94a3b8; border-radius: 12px; margin: 4px 16px; transition: 0.2s; }
        .nav-item:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }
        .nav-active { background: #3b82f6; color: white !important; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2); }
        .stat-card { padding: 2rem; transition: 0.3s; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .pulse-online { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
    </style>
</head>
<body>
    <div class="sidebar flex flex-col justify-between py-8">
        <div>
            <div class="px-8 mb-10 flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <i data-feather="shield" class="w-6 h-6"></i>
                </div>
                <span class="text-white text-2xl font-bold tracking-tight">Stom<span class="text-blue-400">Control</span></span>
            </div>
            <nav>
                <a href="#" class="nav-item nav-active"><i data-feather="grid" class="w-5 h-5 mr-3"></i> Overview</a>
                <a href="#" class="nav-item"><i data-feather="users" class="w-5 h-5 mr-3"></i> Patients</a>
                <a href="#" class="nav-item"><i data-feather="calendar" class="w-5 h-5 mr-3"></i> Schedule</a>
                <a href="#" class="nav-item"><i data-feather="activity" class="w-5 h-5 mr-3"></i> Analytics</a>
                <div class="mt-8 px-8 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">System</div>
                <a href="#" class="nav-item"><i data-feather="settings" class="w-5 h-5 mr-3"></i> Settings</a>
                <a href="#" class="nav-item text-red-400"><i data-feather="log-out" class="w-5 h-5 mr-3"></i> Logout</a>
            </nav>
        </div>
        <div class="px-8">
            <div class="bg-slate-800/50 rounded-2xl p-4 flex items-center space-x-3 border border-slate-700/50">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">XA</div>
                <div>
                    <div class="text-white text-sm font-bold">Xeyal Admin</div>
                    <div class="text-slate-500 text-xs flex items-center"><div class="pulse-online mr-1.5"></div> Online</div>
                </div>
            </div>
        </div>
    </div>

    <div class="content-area">
        <div class="flex justify-between items-center mb-12">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Professional Architecture</h1>
                <p class="text-slate-500 mt-1">Full-stack Laravel Enterprise Engine is active.</p>
            </div>
            <div class="flex space-x-4">
                <div class="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center text-slate-600 shadow-sm">
                    <i data-feather="search" class="w-4 h-4 mr-3"></i>
                    <input type="text" placeholder="Global search..." class="bg-transparent outline-none text-sm w-48">
                </div>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center">
                    <i data-feather="plus" class="w-4 h-4 mr-2"></i> Create Report
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div class="glass-card stat-card">
                <div class="flex justify-between items-start mb-6">
                    <div class="p-3 bg-blue-50 rounded-2xl text-blue-600"><i data-feather="users" class="w-6 h-6"></i></div>
                    <div class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">+24%</div>
                </div>
                <div class="text-4xl font-bold text-slate-800">12,402</div>
                <div class="text-slate-400 font-medium text-sm mt-2">Active Patients</div>
            </div>
            <div class="glass-card stat-card">
                <div class="flex justify-between items-start mb-6">
                    <div class="p-3 bg-purple-50 rounded-2xl text-purple-600"><i data-feather="dollar-sign" class="w-6 h-6"></i></div>
                    <div class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">+12.5%</div>
                </div>
                <div class="text-4xl font-bold text-slate-800">$48.2k</div>
                <div class="text-slate-400 font-medium text-sm mt-2">Monthly Revenue</div>
            </div>
            <div class="glass-card stat-card">
                <div class="flex justify-between items-start mb-6">
                    <div class="p-3 bg-amber-50 rounded-2xl text-amber-600"><i data-feather="clock" class="w-6 h-6"></i></div>
                </div>
                <div class="text-4xl font-bold text-slate-800">42</div>
                <div class="text-slate-400 font-medium text-sm mt-2">Pending Tasks</div>
            </div>
            <div class="glass-card stat-card">
                <div class="flex justify-between items-start mb-6">
                    <div class="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><i data-feather="check-circle" class="w-6 h-6"></i></div>
                </div>
                <div class="text-4xl font-bold text-slate-800">99.9%</div>
                <div class="text-slate-400 font-medium text-sm mt-2">System Uptime</div>
            </div>
        </div>

        <div class="glass-card overflow-hidden">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                <h3 class="text-lg font-bold text-slate-800">Recent System Activity</h3>
                <button class="text-blue-600 font-bold text-sm hover:underline">View Deep Logs</button>
            </div>
            <div class="p-0">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                        <tr>
                            <th class="px-8 py-4">Module</th>
                            <th class="px-8 py-4">Action</th>
                            <th class="px-8 py-4">Result</th>
                            <th class="px-8 py-4">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50/50 transition">
                            <td class="px-8 py-5 font-bold text-slate-700">HEALER_ENGINE</td>
                            <td class="px-8 py-5 text-sm text-slate-500">Sanitizing workspace...</td>
                            <td class="px-8 py-5"><span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">Success</span></td>
                            <td class="px-8 py-5 text-xs text-slate-400">2 mins ago</td>
                        </tr>
                        <tr class="hover:bg-slate-50/50 transition">
                            <td class="px-8 py-5 font-bold text-slate-700">CLOUD_BRIDGE</td>
                            <td class="px-8 py-5 text-sm text-slate-500">Synchronizing assets</td>
                            <td class="px-8 py-5"><span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase">Syncing</span></td>
                            <td class="px-8 py-5 text-xs text-slate-400">12 mins ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>feather.replace()</script>
</body>
</html>`,
    'resources/views/backend/layout/base.blade.php': `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <title>@yield('title') – Stom Control</title>
    <link href="{{ asset('images/logo-rounded-icon-primary.svg') }}" rel="shortcut icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ mix('css/backend.bundle.css') }}">
    @stack('head')
    <script>var BASE_URL = '{{ url('/') }}';</script>
</head>
<body class="@yield('body-class', 'app')">
    <div id="global-loading" class="fixed left-0 right-0 top-0 animate-pulse bg-green-500 shadow h-1 w-full hidden z-50"></div>
    @yield('body')
    <script src="{{ mix('js/backend.bundle.js') }}"></script>
    @stack('scripts')
</body>
</html>`,

    'resources/views/backend/layout/backend.blade.php': `@extends('backend.layout.base')

@section('body')
    @include('backend.partials.mobile-menu')

    <div class="flex">
        @include('backend.partials.side-menu')

        <!-- BEGIN: Content -->
        <div class="content">
            @include('backend.partials.top-bar')
            @include('backend.partials.alerts')

            @yield('content')
        </div>
        <!-- END: Content -->
    </div>

    @include('backend.partials.new-patient-modal')
    @include('backend.partials.new-schedule-modal')
@endsection`,

    'resources/views/backend/partials/side-menu.blade.php': `<!-- BEGIN: Side Menu -->
<nav class="side-nav">
    <a href="" class="intro-x flex items-center pl-5 pt-4">
        <img alt="StomControl Logo" class="w-6" src="{{ asset('images/logo.svg') }}">
        <span class="hidden xl:block text-white text-lg ml-3"> Stom<span class="font-medium">Control</span> </span>
    </a>
    <div class="side-nav__devider my-6"></div>
    <ul>
        @can('Dashboard')
        <li>
            <a href="{{ route('backend.dashboard') }}" class="side-menu {{ isActiveRoute('backend.dashboard') }}">
                <div class="side-menu__icon"> <i data-feather="home"></i> </div>
                <div class="side-menu__title"> {{ __('stom.dashboard') }} </div>
            </a>
        </li>
        @endcan

        @can('Patients')
        <li>
            <a href="{{ route('backend.patient.index') }}" class="side-menu {{ isActiveRoute('backend.patient.*') }}">
                <div class="side-menu__icon"> <i data-feather="users"></i> </div>
                <div class="side-menu__title"> {{ __('stom.patients') }} </div>
            </a>
        </li>
        @endcan

        @can('Schedule')
        <li>
            <a href="{{ route('backend.schedule.index') }}" class="side-menu {{ isActiveRoute('backend.schedule.*') }}">
                <div class="side-menu__icon"> <i data-feather="calendar"></i> </div>
                <div class="side-menu__title"> {{ __('stom.schedule') }} </div>
            </a>
        </li>
        @endcan

        @role('admin')
        <li class="side-nav__devider my-6"></li>
        <li>
            <a href="javascript:;" class="side-menu {{ isActiveRoute('backend.admin.*') }}">
                <div class="side-menu__icon"> <i data-feather="circle"></i> </div>
                <div class="side-menu__title">
                    {{ __('stom.administrator') }}
                    <div class="side-menu__sub-icon"> <i data-feather="chevron-down"></i> </div>
                </div>
            </a>
            <ul class="{{ isActiveRoute('backend.admin.*', 'side-menu__sub-open') }}">
                <li>
                    <a href="{{ route('backend.admin.users.index') }}" class="side-menu {{ isActiveRoute('backend.admin.users.*') }}">
                        <div class="side-menu__icon"> <i data-feather="users"></i> </div>
                        <div class="side-menu__title"> {{ __('stom.users') }} </div>
                    </a>
                </li>
            </ul>
        </li>
        @endrole
    </ul>
</nav>
<!-- END: Side Menu -->`,

    'resources/views/backend/partials/top-bar.blade.php': `<!-- BEGIN: Top Bar -->
<div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
        {{ Breadcrumbs::render() }}
    </div>
    <!-- END: Breadcrumb -->

    <!-- BEGIN: Quick Actions -->
    @if(Session::has('clinic_id'))
    <div class="intro-x mr-auto sm:mr-6">
        <button data-toggle="modal" data-target="#new-patient-modal" class="btn btn-primary shadow-md mr-2">
            <i data-feather="plus" class="w-4 h-4 mr-2"></i> {{ __('stom.new_patient') }}
        </button>
    </div>
    @endif
    <!-- END: Quick Actions -->

    <!-- BEGIN: Notifications -->
    @can('Notifications')
    <div class="intro-x dropdown mr-auto sm:mr-6">
        <div class="dropdown-toggle notification {{ $unreadNotificationsCount > 0 ? 'notification--bullet' : '' }} cursor-pointer" role="button" aria-expanded="false">
            <i data-feather="bell" class="notification__icon dark:text-gray-300"></i>
        </div>
    </div>
    @endcan
    <!-- END: Notifications -->

    <!-- BEGIN: Account Menu -->
    <div class="intro-x dropdown w-8 h-8">
        <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in" role="button" aria-expanded="false">
            <img alt="User Avatar" src="{{ asset('images/icons/user-male.png') }}">
        </div>
        <div class="dropdown-menu w-56">
            <div class="dropdown-menu__content box bg-theme-26 dark:bg-dark-6 text-white">
                <div class="p-4 border-b border-theme-27 dark:border-dark-3">
                    <div class="font-medium">{{ Auth::user()->name ?? 'Admin' }}</div>
                    <div class="text-xs text-theme-28 mt-0.5 dark:text-gray-600">{{ Auth::user()->email ?? 'admin@stomcontrol.com' }}</div>
                </div>
                <div class="p-2 border-t border-theme-27 dark:border-dark-3">
                    <a href="{{ route('backend.logout') }}" class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                        <i data-feather="toggle-right" class="w-4 h-4 mr-2"></i> {{ __('stom.logout') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Account Menu -->
</div>
<!-- END: Top Bar -->`,

    'resources/views/backend/partials/mobile-menu.blade.php': `<!-- BEGIN: Mobile Menu -->
<div class="mobile-menu md:hidden">
    <div class="mobile-menu-bar">
        <a href="" class="flex mr-auto">
            <img alt="StomControl Logo" class="w-6" src="{{ asset('images/logo.svg') }}">
        </a>
        <a href="javascript:;" id="mobile-menu-toggler"> <i data-feather="bar-chart-2" class="w-8 h-8 text-white transform -rotate-90"></i> </a>
    </div>
</div>
<!-- END: Mobile Menu -->`,

    'resources/views/backend/partials/alerts.blade.php': `@if (session('success'))
    <div class="alert alert-success show mb-2">{{ session('success') }}</div>
@endif
@if (session('error'))
    <div class="alert alert-danger show mb-2">{{ session('error') }}</div>
@endif`,

    'resources/views/backend/partials/new-patient-modal.blade.php': `<div id="new-patient-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('backend.patient.store') }}" method="POST">
                @csrf
                <div class="modal-header">
                    <h2 class="font-medium text-base mr-auto">{{ __('stom.new_patient') }}</h2>
                </div>
                <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12">
                        <label class="form-label">{{ __('stom.name') }}</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>
                </div>
                <div class="modal-footer text-right">
                    <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">{{ __('stom.cancel') }}</button>
                    <button type="submit" class="btn btn-primary w-20">{{ __('stom.save') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>`,

    'resources/views/backend/dashboard/index.blade.php': `@extends('backend.layout.backend')

@section('title', __('stom.dashboard'))

@section('content')
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 xxl:col-span-9">
            <div class="grid grid-cols-12 gap-6">
                <!-- BEGIN: General Report -->
                <div class="col-span-12 mt-8">
                    <div class="intro-y flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">
                            {{ __('stom.general_report') }}
                        </h2>
                        <a href="" class="ml-auto flex items-center text-theme-1 dark:text-theme-10">
                            <i data-feather="refresh-ccw" class="w-4 h-4 mr-3"></i> {{ __('stom.reload_data') }}
                        </a>
                    </div>
                    <div class="grid grid-cols-12 gap-6 mt-5">
                        <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div class="report-box zoom-in">
                                <div class="box p-5">
                                    <div class="flex">
                                        <i data-feather="users" class="report-box__icon text-theme-10"></i>
                                    </div>
                                    <div class="text-3xl font-bold leading-8 mt-6">4.710</div>
                                    <div class="text-base text-gray-600 mt-1">{{ __('stom.total_patients') }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div class="report-box zoom-in">
                                <div class="box p-5">
                                    <div class="flex">
                                        <i data-feather="calendar" class="report-box__icon text-theme-11"></i>
                                    </div>
                                    <div class="text-3xl font-bold leading-8 mt-6">12</div>
                                    <div class="text-base text-gray-600 mt-1">{{ __('stom.appointments_today') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END: General Report -->
            </div>
        </div>
    </div>
@endsection`,

    'routes/backend.php': `<?php
/**
 * STOMCONTROL PROFESSIONAL ARCHITECTURE
 * Finalized Production Routes
 */
use Illuminate\\Support\\Facades\\Route;

Route::group(['middleware' => 'under-construction', 'namespace' => 'App\\Http\\Controllers\\Backend'], function () {

    // Authentication Cluster
    Route::get('login', 'AuthController@showLoginForm')->name('login');
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout')->name('logout');

    // Laboratory Guardian (Specific Guard: Lab)
    Route::middleware('auth:lab')->group(function () {
        Route::get('laboratory-tasks', 'LaboratoryTasksController@index')->name('laboratory.my_tasks.index');
    });

    // Core Protected Ecosystem
    Route::middleware('auth')->group(function () {
        Route::get('/', 'DashboardController@index')->name('dashboard');
        Route::resource('clinic', 'ClinicController');
        Route::get('clinic/selector', 'ClinicController@selector')->name('clinic.selector');
        Route::get('clinic/selector/{clinic}', 'ClinicController@switch_clinic')->name('clinic.switch');

        // Billed & Clinic-Validated Territory
        Route::middleware(['billing', 'clinic'])->group(function () {
            Route::resource('patient', 'PatientController');
            Route::get('schedule', 'ScheduleController@index')->name('schedule.index');
            Route::resource('laboratory', 'LaboratoryController');

            // Patient Deep-Work Context
            Route::prefix('patient/{patient}')->name('patient.')->group(function () {
                Route::get('work', 'WorkController@work')->name('work');
                Route::post('payments', 'PaymentController@store')->name('payments.store');
                Route::resource('history', 'PatientHistoryController');
            });

            // Master Administrator Sanctum
            Route::prefix('admin')->name('admin.')->group(function () {
                Route::resource('users', 'Admin\\UserController');
                Route::resource('clinic', 'Admin\\ClinicController');
                Route::get('audit-logs', 'Admin\\AuditController@index')->name('audit.index');
                Route::get('system-health', 'Admin\\HealthController@check')->name('health.check');
            });
        });
    });
});
`
  }
}

});
